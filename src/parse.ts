import Parse from 'parse'

// Some older WebViews and browsers expose crypto but do not implement
// randomUUID. Parse may use it internally for request identifiers.
// This standards-compatible fallback keeps login, registration, and uploads
// working without changing the security of user passwords or sessions.
if (typeof globalThis !== 'undefined' && globalThis.crypto && !globalThis.crypto.randomUUID) {
  const createUuid = () => {
    const bytes = new Uint8Array(16);
    globalThis.crypto.getRandomValues(bytes);
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
  };
  Object.defineProperty(globalThis.crypto, 'randomUUID', { value: createUuid, configurable: true });
}

// In Back4App Draft/Published the safe relative endpoint is used. For a
// downloaded project, set all three VITE_PARSE_* values in .env.local.
// A partial configuration is deliberately ignored: it is a common reason
// for 401/unauthorized errors when an Application ID belongs to another app.
type RuntimeConfig = {
  VITE_PARSE_APP_ID?: string
  VITE_PARSE_SERVER_URL?: string
  VITE_PARSE_JAVASCRIPT_KEY?: string
}

const runtimeConfig = typeof window === 'undefined'
  ? {}
  : ((window as Window & { __SMART_UBUHINZI_CONFIG__?: RuntimeConfig }).__SMART_UBUHINZI_CONFIG__ || {})
const configuredAppId = String(runtimeConfig.VITE_PARSE_APP_ID || import.meta.env.VITE_PARSE_APP_ID || '').trim()
const configuredServerUrl = String(runtimeConfig.VITE_PARSE_SERVER_URL || import.meta.env.VITE_PARSE_SERVER_URL || '').trim()
const configuredJavaScriptKey = String(runtimeConfig.VITE_PARSE_JAVASCRIPT_KEY || import.meta.env.VITE_PARSE_JAVASCRIPT_KEY || '').trim()
const useExternalBack4App = Boolean(configuredAppId && configuredServerUrl)

Parse.initialize(
  useExternalBack4App ? configuredAppId : 'sandbox-app-id',
  useExternalBack4App ? configuredJavaScriptKey : '',
)
Parse.serverURL = useExternalBack4App ? configuredServerUrl.replace(/\/$/, '') : '/parse'

// LiveQuery needs an ABSOLUTE ws/wss URL. The preview runs in PATH MODE (api
// proxy at /agents/<id>/preview), where the injected bootstrap exposes the
// parse proxy MOUNT as __BACK4APP_PARSE_BASE__ (e.g. /agents/<id>/parse). The
// WS MUST use that — a bare '/parse' would NOT be routed by the api (it only
// forwards /agents/<id>/parse). Fall back to '/parse' for the direct sandbox
// tunnel and the published app (own domain, where Vite/nginx proxy it).
if (typeof window !== 'undefined') {
  const base =
    (window as unknown as { __BACK4APP_PARSE_BASE__?: string })
      .__BACK4APP_PARSE_BASE__ || '/parse'
  const wsProto = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
  Parse.liveQueryServerURL = `${wsProto}//${window.location.host}${base}`
}

export default Parse
