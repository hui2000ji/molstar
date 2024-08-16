export const BACKEND_HOST = (window.location.host.startsWith(
    'geobiologics-cn.biogeom.com'
) || window.location.host.startsWith(
    'geobiologics.biogeom.com'
))
    ? 'https://geobiologics-backend.biogeom.com'
    : 'http://geobiologics-cn-api-test.biogeom.com';
