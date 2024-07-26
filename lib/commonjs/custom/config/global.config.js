"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BACKEND_HOST = void 0;
exports.BACKEND_HOST = window.location.host.includes('https://geobiologics-cn.biogeom.com')
    ? 'https://geobiologics-backend.biogeom.com'
    : 'http://geobiologics-cn-api-test.biogeom.com';
