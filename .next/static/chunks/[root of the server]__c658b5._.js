(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/[root of the server]__c658b5._.js", {

"[turbopack]/browser/dev/hmr-client/websocket.ts [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, z: __turbopack_require_stub__ } = __turbopack_context__;
{
// Adapted from https://github.com/vercel/next.js/blob/canary/packages/next/src/client/dev/error-overlay/websocket.ts
__turbopack_esm__({
    "addMessageListener": (()=>addMessageListener),
    "connectHMR": (()=>connectHMR),
    "sendMessage": (()=>sendMessage)
});
let source;
const eventCallbacks = [];
// TODO: add timeout again
// let lastActivity = Date.now()
function getSocketProtocol(assetPrefix) {
    let protocol = location.protocol;
    try {
        // assetPrefix is a url
        protocol = new URL(assetPrefix).protocol;
    } catch (_) {}
    return protocol === "http:" ? "ws" : "wss";
}
function addMessageListener(cb) {
    eventCallbacks.push(cb);
}
function sendMessage(data) {
    if (!source || source.readyState !== source.OPEN) return;
    return source.send(data);
}
function connectHMR(options) {
    const { timeout = 5 * 1000 } = options;
    function init() {
        if (source) source.close();
        console.log("[HMR] connecting...");
        function handleOnline() {
            const connected = {
                type: "turbopack-connected"
            };
            eventCallbacks.forEach((cb)=>{
                cb(connected);
            });
            if (options.log) console.log("[HMR] connected");
        // lastActivity = Date.now()
        }
        function handleMessage(event) {
            // lastActivity = Date.now()
            const message = {
                type: "turbopack-message",
                data: JSON.parse(event.data)
            };
            eventCallbacks.forEach((cb)=>{
                cb(message);
            });
        }
        // let timer: NodeJS.Timeout
        function handleDisconnect() {
            source.close();
            setTimeout(init, timeout);
        }
        const { hostname, port } = location;
        const protocol = getSocketProtocol(options.assetPrefix || "");
        const assetPrefix = options.assetPrefix.replace(/^\/+/, "");
        let url = `${protocol}://${hostname}:${port}${assetPrefix ? `/${assetPrefix}` : ""}`;
        if (assetPrefix.startsWith("http")) {
            url = `${protocol}://${assetPrefix.split("://")[1]}`;
        }
        source = new window.WebSocket(`${url}${options.path}`);
        source.onopen = handleOnline;
        source.onerror = handleDisconnect;
        source.onmessage = handleMessage;
    }
    init();
}
}}),
"[turbopack]/browser/dev/hmr-client/hmr-client.ts [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, z: __turbopack_require_stub__ } = __turbopack_context__;
{
/// <reference path="../../../shared/runtime-types.d.ts" />
/// <reference path="../../runtime/base/dev-globals.d.ts" />
/// <reference path="../../runtime/base/dev-protocol.d.ts" />
/// <reference path="../../runtime/base/dev-extensions.ts" />
__turbopack_esm__({
    "connect": (()=>connect),
    "setHooks": (()=>setHooks),
    "subscribeToUpdate": (()=>subscribeToUpdate)
});
var __TURBOPACK__imported__module__$5b$turbopack$5d2f$browser$2f$dev$2f$hmr$2d$client$2f$websocket$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[turbopack]/browser/dev/hmr-client/websocket.ts [client] (ecmascript)");
;
function connect({ // TODO(WEB-1465) Remove this backwards compat fallback once
// vercel/next.js#54586 is merged.
addMessageListener = __TURBOPACK__imported__module__$5b$turbopack$5d2f$browser$2f$dev$2f$hmr$2d$client$2f$websocket$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["addMessageListener"], // TODO(WEB-1465) Remove this backwards compat fallback once
// vercel/next.js#54586 is merged.
sendMessage = __TURBOPACK__imported__module__$5b$turbopack$5d2f$browser$2f$dev$2f$hmr$2d$client$2f$websocket$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["sendMessage"], onUpdateError = console.error }) {
    addMessageListener((msg)=>{
        switch(msg.type){
            case "turbopack-connected":
                handleSocketConnected(sendMessage);
                break;
            default:
                try {
                    if (Array.isArray(msg.data)) {
                        for(let i = 0; i < msg.data.length; i++){
                            handleSocketMessage(msg.data[i]);
                        }
                    } else {
                        handleSocketMessage(msg.data);
                    }
                    applyAggregatedUpdates();
                } catch (e) {
                    console.warn("[Fast Refresh] performing full reload\n\n" + "Fast Refresh will perform a full reload when you edit a file that's imported by modules outside of the React rendering tree.\n" + "You might have a file which exports a React component but also exports a value that is imported by a non-React component file.\n" + "Consider migrating the non-React component export to a separate file and importing it into both files.\n\n" + "It is also possible the parent component of the component you edited is a class component, which disables Fast Refresh.\n" + "Fast Refresh requires at least one parent function component in your React tree.");
                    onUpdateError(e);
                    location.reload();
                }
                break;
        }
    });
    const queued = globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS;
    if (queued != null && !Array.isArray(queued)) {
        throw new Error("A separate HMR handler was already registered");
    }
    globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS = {
        push: ([chunkPath, callback])=>{
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    };
    if (Array.isArray(queued)) {
        for (const [chunkPath, callback] of queued){
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    }
}
const updateCallbackSets = new Map();
function sendJSON(sendMessage, message) {
    sendMessage(JSON.stringify(message));
}
function resourceKey(resource) {
    return JSON.stringify({
        path: resource.path,
        headers: resource.headers || null
    });
}
function subscribeToUpdates(sendMessage, resource) {
    sendJSON(sendMessage, {
        type: "turbopack-subscribe",
        ...resource
    });
    return ()=>{
        sendJSON(sendMessage, {
            type: "turbopack-unsubscribe",
            ...resource
        });
    };
}
function handleSocketConnected(sendMessage) {
    for (const key of updateCallbackSets.keys()){
        subscribeToUpdates(sendMessage, JSON.parse(key));
    }
}
// we aggregate all pending updates until the issues are resolved
const chunkListsWithPendingUpdates = new Map();
function aggregateUpdates(msg) {
    const key = resourceKey(msg.resource);
    let aggregated = chunkListsWithPendingUpdates.get(key);
    if (aggregated) {
        aggregated.instruction = mergeChunkListUpdates(aggregated.instruction, msg.instruction);
    } else {
        chunkListsWithPendingUpdates.set(key, msg);
    }
}
function applyAggregatedUpdates() {
    if (chunkListsWithPendingUpdates.size === 0) return;
    hooks.beforeRefresh();
    for (const msg of chunkListsWithPendingUpdates.values()){
        triggerUpdate(msg);
    }
    chunkListsWithPendingUpdates.clear();
    finalizeUpdate();
}
function mergeChunkListUpdates(updateA, updateB) {
    let chunks;
    if (updateA.chunks != null) {
        if (updateB.chunks == null) {
            chunks = updateA.chunks;
        } else {
            chunks = mergeChunkListChunks(updateA.chunks, updateB.chunks);
        }
    } else if (updateB.chunks != null) {
        chunks = updateB.chunks;
    }
    let merged;
    if (updateA.merged != null) {
        if (updateB.merged == null) {
            merged = updateA.merged;
        } else {
            // Since `merged` is an array of updates, we need to merge them all into
            // one, consistent update.
            // Since there can only be `EcmascriptMergeUpdates` in the array, there is
            // no need to key on the `type` field.
            let update = updateA.merged[0];
            for(let i = 1; i < updateA.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateA.merged[i]);
            }
            for(let i = 0; i < updateB.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateB.merged[i]);
            }
            merged = [
                update
            ];
        }
    } else if (updateB.merged != null) {
        merged = updateB.merged;
    }
    return {
        type: "ChunkListUpdate",
        chunks,
        merged
    };
}
function mergeChunkListChunks(chunksA, chunksB) {
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    return chunks;
}
function mergeChunkUpdates(updateA, updateB) {
    if (updateA.type === "added" && updateB.type === "deleted" || updateA.type === "deleted" && updateB.type === "added") {
        return undefined;
    }
    if (updateA.type === "partial") {
        invariant(updateA.instruction, "Partial updates are unsupported");
    }
    if (updateB.type === "partial") {
        invariant(updateB.instruction, "Partial updates are unsupported");
    }
    return undefined;
}
function mergeChunkListEcmascriptMergedUpdates(mergedA, mergedB) {
    const entries = mergeEcmascriptChunkEntries(mergedA.entries, mergedB.entries);
    const chunks = mergeEcmascriptChunksUpdates(mergedA.chunks, mergedB.chunks);
    return {
        type: "EcmascriptMergedUpdate",
        entries,
        chunks
    };
}
function mergeEcmascriptChunkEntries(entriesA, entriesB) {
    return {
        ...entriesA,
        ...entriesB
    };
}
function mergeEcmascriptChunksUpdates(chunksA, chunksB) {
    if (chunksA == null) {
        return chunksB;
    }
    if (chunksB == null) {
        return chunksA;
    }
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeEcmascriptChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    if (Object.keys(chunks).length === 0) {
        return undefined;
    }
    return chunks;
}
function mergeEcmascriptChunkUpdates(updateA, updateB) {
    if (updateA.type === "added" && updateB.type === "deleted") {
        // These two completely cancel each other out.
        return undefined;
    }
    if (updateA.type === "deleted" && updateB.type === "added") {
        const added = [];
        const deleted = [];
        const deletedModules = new Set(updateA.modules ?? []);
        const addedModules = new Set(updateB.modules ?? []);
        for (const moduleId of addedModules){
            if (!deletedModules.has(moduleId)) {
                added.push(moduleId);
            }
        }
        for (const moduleId of deletedModules){
            if (!addedModules.has(moduleId)) {
                deleted.push(moduleId);
            }
        }
        if (added.length === 0 && deleted.length === 0) {
            return undefined;
        }
        return {
            type: "partial",
            added,
            deleted
        };
    }
    if (updateA.type === "partial" && updateB.type === "partial") {
        const added = new Set([
            ...updateA.added ?? [],
            ...updateB.added ?? []
        ]);
        const deleted = new Set([
            ...updateA.deleted ?? [],
            ...updateB.deleted ?? []
        ]);
        if (updateB.added != null) {
            for (const moduleId of updateB.added){
                deleted.delete(moduleId);
            }
        }
        if (updateB.deleted != null) {
            for (const moduleId of updateB.deleted){
                added.delete(moduleId);
            }
        }
        return {
            type: "partial",
            added: [
                ...added
            ],
            deleted: [
                ...deleted
            ]
        };
    }
    if (updateA.type === "added" && updateB.type === "partial") {
        const modules = new Set([
            ...updateA.modules ?? [],
            ...updateB.added ?? []
        ]);
        for (const moduleId of updateB.deleted ?? []){
            modules.delete(moduleId);
        }
        return {
            type: "added",
            modules: [
                ...modules
            ]
        };
    }
    if (updateA.type === "partial" && updateB.type === "deleted") {
        // We could eagerly return `updateB` here, but this would potentially be
        // incorrect if `updateA` has added modules.
        const modules = new Set(updateB.modules ?? []);
        if (updateA.added != null) {
            for (const moduleId of updateA.added){
                modules.delete(moduleId);
            }
        }
        return {
            type: "deleted",
            modules: [
                ...modules
            ]
        };
    }
    // Any other update combination is invalid.
    return undefined;
}
function invariant(_, message) {
    throw new Error(`Invariant: ${message}`);
}
const CRITICAL = [
    "bug",
    "error",
    "fatal"
];
function compareByList(list, a, b) {
    const aI = list.indexOf(a) + 1 || list.length;
    const bI = list.indexOf(b) + 1 || list.length;
    return aI - bI;
}
const chunksWithIssues = new Map();
function emitIssues() {
    const issues = [];
    const deduplicationSet = new Set();
    for (const [_, chunkIssues] of chunksWithIssues){
        for (const chunkIssue of chunkIssues){
            if (deduplicationSet.has(chunkIssue.formatted)) continue;
            issues.push(chunkIssue);
            deduplicationSet.add(chunkIssue.formatted);
        }
    }
    sortIssues(issues);
    hooks.issues(issues);
}
function handleIssues(msg) {
    const key = resourceKey(msg.resource);
    let hasCriticalIssues = false;
    for (const issue of msg.issues){
        if (CRITICAL.includes(issue.severity)) {
            hasCriticalIssues = true;
        }
    }
    if (msg.issues.length > 0) {
        chunksWithIssues.set(key, msg.issues);
    } else if (chunksWithIssues.has(key)) {
        chunksWithIssues.delete(key);
    }
    emitIssues();
    return hasCriticalIssues;
}
const SEVERITY_ORDER = [
    "bug",
    "fatal",
    "error",
    "warning",
    "info",
    "log"
];
const CATEGORY_ORDER = [
    "parse",
    "resolve",
    "code generation",
    "rendering",
    "typescript",
    "other"
];
function sortIssues(issues) {
    issues.sort((a, b)=>{
        const first = compareByList(SEVERITY_ORDER, a.severity, b.severity);
        if (first !== 0) return first;
        return compareByList(CATEGORY_ORDER, a.category, b.category);
    });
}
const hooks = {
    beforeRefresh: ()=>{},
    refresh: ()=>{},
    buildOk: ()=>{},
    issues: (_issues)=>{}
};
function setHooks(newHooks) {
    Object.assign(hooks, newHooks);
}
function handleSocketMessage(msg) {
    sortIssues(msg.issues);
    handleIssues(msg);
    switch(msg.type){
        case "issues":
            break;
        case "partial":
            // aggregate updates
            aggregateUpdates(msg);
            break;
        default:
            // run single update
            const runHooks = chunkListsWithPendingUpdates.size === 0;
            if (runHooks) hooks.beforeRefresh();
            triggerUpdate(msg);
            if (runHooks) finalizeUpdate();
            break;
    }
}
function finalizeUpdate() {
    hooks.refresh();
    hooks.buildOk();
    // This is used by the Next.js integration test suite to notify it when HMR
    // updates have been completed.
    // TODO: Only run this in test environments (gate by `process.env.__NEXT_TEST_MODE`)
    if (globalThis.__NEXT_HMR_CB) {
        globalThis.__NEXT_HMR_CB();
        globalThis.__NEXT_HMR_CB = null;
    }
}
function subscribeToChunkUpdate(chunkPath, sendMessage, callback) {
    return subscribeToUpdate({
        path: chunkPath
    }, sendMessage, callback);
}
function subscribeToUpdate(resource, sendMessage, callback) {
    // TODO(WEB-1465) Remove this backwards compat fallback once
    // vercel/next.js#54586 is merged.
    if (callback === undefined) {
        callback = sendMessage;
        sendMessage = __TURBOPACK__imported__module__$5b$turbopack$5d2f$browser$2f$dev$2f$hmr$2d$client$2f$websocket$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["sendMessage"];
    }
    const key = resourceKey(resource);
    let callbackSet;
    const existingCallbackSet = updateCallbackSets.get(key);
    if (!existingCallbackSet) {
        callbackSet = {
            callbacks: new Set([
                callback
            ]),
            unsubscribe: subscribeToUpdates(sendMessage, resource)
        };
        updateCallbackSets.set(key, callbackSet);
    } else {
        existingCallbackSet.callbacks.add(callback);
        callbackSet = existingCallbackSet;
    }
    return ()=>{
        callbackSet.callbacks.delete(callback);
        if (callbackSet.callbacks.size === 0) {
            callbackSet.unsubscribe();
            updateCallbackSets.delete(key);
        }
    };
}
function triggerUpdate(msg) {
    const key = resourceKey(msg.resource);
    const callbackSet = updateCallbackSets.get(key);
    if (!callbackSet) {
        return;
    }
    for (const callback of callbackSet.callbacks){
        callback(msg);
    }
    if (msg.type === "notFound") {
        // This indicates that the resource which we subscribed to either does not exist or
        // has been deleted. In either case, we should clear all update callbacks, so if a
        // new subscription is created for the same resource, it will send a new "subscribe"
        // message to the server.
        // No need to send an "unsubscribe" message to the server, it will have already
        // dropped the update stream before sending the "notFound" message.
        updateCallbackSets.delete(key);
    }
}
}}),
"[project]/src/components/UserDropdown.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next-auth/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/link.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/react-i18next/dist/es/index.js [client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react-i18next/dist/es/useTranslation.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$dropdown$2f$dist$2f$chunk$2d$KQ5CH2X7$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__dropdown_default__as__Dropdown$3e$__ = __turbopack_import__("[project]/node_modules/@heroui/dropdown/dist/chunk-KQ5CH2X7.mjs [client] (ecmascript) <export dropdown_default as Dropdown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$dropdown$2f$dist$2f$chunk$2d$4LJ2IKXJ$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__dropdown_trigger_default__as__DropdownTrigger$3e$__ = __turbopack_import__("[project]/node_modules/@heroui/dropdown/dist/chunk-4LJ2IKXJ.mjs [client] (ecmascript) <export dropdown_trigger_default as DropdownTrigger>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$io$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react-icons/io/index.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$dropdown$2f$dist$2f$chunk$2d$UIQ4674R$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__dropdown_menu_default__as__DropdownMenu$3e$__ = __turbopack_import__("[project]/node_modules/@heroui/dropdown/dist/chunk-UIQ4674R.mjs [client] (ecmascript) <export dropdown_menu_default as DropdownMenu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$menu$2f$dist$2f$chunk$2d$BIY4SM4Z$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__menu_item_base_default__as__DropdownItem$3e$__ = __turbopack_import__("[project]/node_modules/@heroui/menu/dist/chunk-BIY4SM4Z.mjs [client] (ecmascript) <export menu_item_base_default as DropdownItem>");
;
var _s = __turbopack_refresh__.signature();
;
;
;
;
;
const UserDropdown = ()=>{
    _s();
    const { data: session } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useSession"])();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useTranslation"])();
    const onAction = (key)=>{
        if (key == "logout") {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["signOut"])();
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$dropdown$2f$dist$2f$chunk$2d$KQ5CH2X7$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__dropdown_default__as__Dropdown$3e$__["Dropdown"], {
        placement: "bottom-end",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$dropdown$2f$dist$2f$chunk$2d$4LJ2IKXJ$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__dropdown_trigger_default__as__DropdownTrigger$3e$__["DropdownTrigger"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "border rounded-lg px-2 py-1 flex gap-1 items-center cursor-pointer",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "capitalize hidden md:inline",
                            children: session?.user?.name
                        }, void 0, false, {
                            fileName: "[project]/src/components/UserDropdown.tsx",
                            lineNumber: 26,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: [
                                " ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$io$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["IoMdArrowDropdown"], {}, void 0, false, {
                                    fileName: "[project]/src/components/UserDropdown.tsx",
                                    lineNumber: 31,
                                    columnNumber: 13
                                }, this),
                                " "
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/UserDropdown.tsx",
                            lineNumber: 29,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/UserDropdown.tsx",
                    lineNumber: 25,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/UserDropdown.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$dropdown$2f$dist$2f$chunk$2d$UIQ4674R$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__dropdown_menu_default__as__DropdownMenu$3e$__["DropdownMenu"], {
                "aria-label": "Profile Actions",
                variant: "flat",
                disabledKeys: [
                    "profile"
                ],
                onAction: onAction,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$menu$2f$dist$2f$chunk$2d$BIY4SM4Z$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__menu_item_base_default__as__DropdownItem$3e$__["DropdownItem"], {
                        className: "h-14 gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-semibold",
                                children: t("logged_as")
                            }, void 0, false, {
                                fileName: "[project]/src/components/UserDropdown.tsx",
                                lineNumber: 42,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-semibold",
                                children: session?.user?.email
                            }, void 0, false, {
                                fileName: "[project]/src/components/UserDropdown.tsx",
                                lineNumber: 43,
                                columnNumber: 11
                            }, this)
                        ]
                    }, "profile", true, {
                        fileName: "[project]/src/components/UserDropdown.tsx",
                        lineNumber: 41,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$menu$2f$dist$2f$chunk$2d$BIY4SM4Z$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__menu_item_base_default__as__DropdownItem$3e$__["DropdownItem"], {
                        as: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"],
                        href: "/profile",
                        children: t("menu.profile")
                    }, "settings", false, {
                        fileName: "[project]/src/components/UserDropdown.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$menu$2f$dist$2f$chunk$2d$BIY4SM4Z$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__menu_item_base_default__as__DropdownItem$3e$__["DropdownItem"], {
                        color: "danger",
                        children: t("logout")
                    }, "logout", false, {
                        fileName: "[project]/src/components/UserDropdown.tsx",
                        lineNumber: 48,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/UserDropdown.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/UserDropdown.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, this);
};
_s(UserDropdown, "PkqHig3aiSsAmXUA5swQClGQbtQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useSession"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useTranslation"]
    ];
});
_c = UserDropdown;
const __TURBOPACK__default__export__ = UserDropdown;
var _c;
__turbopack_refresh__.register(_c, "UserDropdown");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/routes/index.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "ROUTES": (()=>ROUTES)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$md$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react-icons/md/index.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$hi$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react-icons/hi/index.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$go$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react-icons/go/index.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$hi2$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react-icons/hi2/index.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa6$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react-icons/fa6/index.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$bi$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react-icons/bi/index.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$io$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react-icons/io/index.mjs [client] (ecmascript)");
;
;
;
;
;
;
;
;
const ROUTES = (i18n)=>[
        {
            key: "dashboard",
            route: "/",
            display: i18n.t("menu.dashboard"),
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$md$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["MdDashboard"], {
                size: 28
            }, void 0, false, {
                fileName: "[project]/src/routes/index.tsx",
                lineNumber: 30,
                columnNumber: 11
            }, this)
        },
        {
            key: "team",
            route: "/team",
            display: i18n.t("menu.my_team"),
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$hi$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["HiUsers"], {
                size: 28
            }, void 0, false, {
                fileName: "[project]/src/routes/index.tsx",
                lineNumber: 36,
                columnNumber: 11
            }, this),
            children: [
                {
                    key: "my-team",
                    route: "/team/me",
                    display: i18n.t("menu.my_team"),
                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$go$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["GoDotFill"], {}, void 0, false, {
                        fileName: "[project]/src/routes/index.tsx",
                        lineNumber: 42,
                        columnNumber: 15
                    }, this)
                },
                {
                    key: "unilevel",
                    route: "/team/unilevel",
                    display: i18n.t("menu.unilevel"),
                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$go$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["GoDotFill"], {}, void 0, false, {
                        fileName: "[project]/src/routes/index.tsx",
                        lineNumber: 48,
                        columnNumber: 15
                    }, this)
                },
                {
                    key: "binary",
                    route: "/team/binary",
                    display: i18n.t("menu.binary"),
                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$go$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["GoDotFill"], {}, void 0, false, {
                        fileName: "[project]/src/routes/index.tsx",
                        lineNumber: 54,
                        columnNumber: 15
                    }, this)
                }
            ]
        },
        {
            key: "academy",
            route: "/academy",
            display: i18n.t("menu.academy"),
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$hi2$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["HiAcademicCap"], {
                size: 28
            }, void 0, false, {
                fileName: "[project]/src/routes/index.tsx",
                lineNumber: 62,
                columnNumber: 11
            }, this),
            disabled: false,
            children: [
                {
                    key: "academy-list",
                    route: "/academy/",
                    display: i18n.t("menu.academy"),
                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$go$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["GoDotFill"], {}, void 0, false, {
                        fileName: "[project]/src/routes/index.tsx",
                        lineNumber: 69,
                        columnNumber: 15
                    }, this),
                    disabled: false
                },
                {
                    key: "academy-filmed",
                    route: "/academy/filmed",
                    display: i18n.t("menu.past_sessions"),
                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$go$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["GoDotFill"], {}, void 0, false, {
                        fileName: "[project]/src/routes/index.tsx",
                        lineNumber: 76,
                        columnNumber: 15
                    }, this),
                    disabled: true
                },
                {
                    key: "academy-live",
                    route: "/academy/live",
                    display: i18n.t("menu.live_sessions"),
                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$go$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["GoDotFill"], {}, void 0, false, {
                        fileName: "[project]/src/routes/index.tsx",
                        lineNumber: 83,
                        columnNumber: 15
                    }, this),
                    disabled: true
                }
            ]
        },
        {
            key: "ranks",
            route: "/ranks",
            display: i18n.t("menu.ranks"),
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$go$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["GoTrophy"], {
                size: 24
            }, void 0, false, {
                fileName: "[project]/src/routes/index.tsx",
                lineNumber: 92,
                columnNumber: 11
            }, this)
        },
        {
            key: "investment",
            route: "/investment",
            display: i18n.t("menu.investments"),
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa6$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["FaMoneyBillTrendUp"], {
                size: 24
            }, void 0, false, {
                fileName: "[project]/src/routes/index.tsx",
                lineNumber: 98,
                columnNumber: 11
            }, this),
            children: [
                {
                    key: "investment-deposit",
                    route: "/investment/deposit",
                    display: i18n.t("menu.invest"),
                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$go$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["GoDotFill"], {}, void 0, false, {
                        fileName: "[project]/src/routes/index.tsx",
                        lineNumber: 104,
                        columnNumber: 15
                    }, this)
                },
                {
                    key: "investment-list",
                    route: "/investment/list",
                    display: i18n.t("menu.my_investments"),
                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$go$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["GoDotFill"], {}, void 0, false, {
                        fileName: "[project]/src/routes/index.tsx",
                        lineNumber: 110,
                        columnNumber: 15
                    }, this)
                }
            ]
        },
        {
            key: "purchases",
            route: "/purchases",
            display: i18n.t("menu.buys"),
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$go$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["GoCreditCard"], {
                size: 24,
                style: {
                    rotate: "-25deg"
                }
            }, void 0, false, {
                fileName: "[project]/src/routes/index.tsx",
                lineNumber: 118,
                columnNumber: 11
            }, this),
            children: [
                {
                    key: "purchases-membership",
                    route: "/purchases/membership",
                    display: i18n.t("menu.buy_membership"),
                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$go$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["GoDotFill"], {}, void 0, false, {
                        fileName: "[project]/src/routes/index.tsx",
                        lineNumber: 124,
                        columnNumber: 15
                    }, this)
                },
                {
                    key: "purchases-me",
                    route: "/purchases/me",
                    display: i18n.t("menu.my_buys"),
                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$go$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["GoDotFill"], {}, void 0, false, {
                        fileName: "[project]/src/routes/index.tsx",
                        lineNumber: 130,
                        columnNumber: 15
                    }, this)
                }
            ]
        },
        {
            key: "fees",
            route: "/fees/me",
            display: i18n.t("commissions.commissions"),
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa6$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["FaChartSimple"], {
                size: 28
            }, void 0, false, {
                fileName: "[project]/src/routes/index.tsx",
                lineNumber: 138,
                columnNumber: 11
            }, this)
        },
        {
            key: "withdrawals",
            route: "/withdrawals",
            display: i18n.t("menu.withdrawals"),
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$bi$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["BiMoneyWithdraw"], {
                size: 28
            }, void 0, false, {
                fileName: "[project]/src/routes/index.tsx",
                lineNumber: 144,
                columnNumber: 11
            }, this)
        },
        {
            key: "signals",
            route: "/signals",
            display: i18n.t("menu.signals"),
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$io$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["IoMdBulb"], {
                size: 28
            }, void 0, false, {
                fileName: "[project]/src/routes/index.tsx",
                lineNumber: 150,
                columnNumber: 11
            }, this),
            disabled: true
        },
        {
            key: "help",
            route: "/support",
            display: i18n.t("menu.help"),
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$io$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["IoMdHelpCircleOutline"], {
                size: 28
            }, void 0, false, {
                fileName: "[project]/src/routes/index.tsx",
                lineNumber: 157,
                columnNumber: 11
            }, this)
        },
        {
            key: "profile",
            route: "/profile",
            display: i18n.t("menu.profile"),
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$hi$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["HiUsers"], {
                size: 28
            }, void 0, false, {
                fileName: "[project]/src/routes/index.tsx",
                lineNumber: 163,
                columnNumber: 11
            }, this)
        }
    ];
_c = ROUTES;
var _c;
__turbopack_refresh__.register(_c, "ROUTES");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/Sidebar.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
/* eslint-disable @typescript-eslint/no-explicit-any */ __turbopack_esm__({
    "RouteGroup": (()=>RouteGroup),
    "RouteNormal": (()=>RouteNormal),
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$routes$2f$index$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/routes/index.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$classnames$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/classnames/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/router.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/react-i18next/dist/es/index.js [client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$link$2f$dist$2f$chunk$2d$OPTZHMJX$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__link_default__as__Link$3e$__ = __turbopack_import__("[project]/node_modules/@heroui/link/dist/chunk-OPTZHMJX.mjs [client] (ecmascript) <export link_default as Link>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$accordion$2f$dist$2f$chunk$2d$NSEVDRZS$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__accordion_default__as__Accordion$3e$__ = __turbopack_import__("[project]/node_modules/@heroui/accordion/dist/chunk-NSEVDRZS.mjs [client] (ecmascript) <export accordion_default as Accordion>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$accordion$2f$dist$2f$chunk$2d$HAJUSXOG$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__accordion_item_base_default__as__AccordionItem$3e$__ = __turbopack_import__("[project]/node_modules/@heroui/accordion/dist/chunk-HAJUSXOG.mjs [client] (ecmascript) <export accordion_item_base_default as AccordionItem>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react-i18next/dist/es/useTranslation.js [client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature(), _s1 = __turbopack_refresh__.signature(), _s2 = __turbopack_refresh__.signature();
;
;
;
;
;
;
const RouteNormal = ({ route })=>{
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$link$2f$dist$2f$chunk$2d$OPTZHMJX$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__link_default__as__Link$3e$__["Link"], {
            href: route.route,
            isDisabled: route.disabled,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$classnames$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])("flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group transition-all", router.pathname == route.route && "font-bold bg-gray-900"),
            children: [
                route.icon,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "ms-3",
                    children: route.display
                }, void 0, false, {
                    fileName: "[project]/src/components/Sidebar.tsx",
                    lineNumber: 22,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/Sidebar.tsx",
            lineNumber: 13,
            columnNumber: 7
        }, this)
    }, route.key, false, {
        fileName: "[project]/src/components/Sidebar.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
};
_s(RouteNormal, "fN7XvhJ+p5oE6+Xlo0NJmXpxjC8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = RouteNormal;
const RouteGroup = ({ route })=>{
    _s1();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [selectedKeys, setSelectedKeys] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(router.pathname.startsWith(route.route) ? new Set([
        "1"
    ]) : []);
    const itemClasses = {
        trigger: "hover:bg-gray-700 rounded-lg px-2"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$accordion$2f$dist$2f$chunk$2d$NSEVDRZS$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__accordion_default__as__Accordion$3e$__["Accordion"], {
            selectedKeys: selectedKeys,
            isCompact: true,
            itemClasses: itemClasses,
            className: "px-0",
            isDisabled: route.disabled,
            onSelectionChange: setSelectedKeys,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$accordion$2f$dist$2f$chunk$2d$HAJUSXOG$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__accordion_item_base_default__as__AccordionItem$3e$__["AccordionItem"], {
                "aria-label": route.display,
                title: route.display,
                startContent: route.icon,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "pl-8",
                    children: route.children?.map((route)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RouteNormal, {
                            route: route
                        }, route.key, false, {
                            fileName: "[project]/src/components/Sidebar.tsx",
                            lineNumber: 54,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/Sidebar.tsx",
                    lineNumber: 52,
                    columnNumber: 11
                }, this)
            }, "1", false, {
                fileName: "[project]/src/components/Sidebar.tsx",
                lineNumber: 46,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/Sidebar.tsx",
            lineNumber: 38,
            columnNumber: 7
        }, this)
    }, route.key, false, {
        fileName: "[project]/src/components/Sidebar.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, this);
};
_s1(RouteGroup, "sAvNXGx2b5H9zlRbx4z5Sql5W4I=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c1 = RouteGroup;
const Sidebar = ()=>{
    _s2();
    const i18n = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useTranslation"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-full px-4 py-4 overflow-y-auto border-divider border-r",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
            className: "space-y-2 font-medium",
            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$routes$2f$index$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["ROUTES"])(i18n).map((route)=>route.children ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RouteGroup, {
                    route: route
                }, route.key, false, {
                    fileName: "[project]/src/components/Sidebar.tsx",
                    lineNumber: 70,
                    columnNumber: 13
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RouteNormal, {
                    route: route
                }, route.key, false, {
                    fileName: "[project]/src/components/Sidebar.tsx",
                    lineNumber: 72,
                    columnNumber: 13
                }, this))
        }, void 0, false, {
            fileName: "[project]/src/components/Sidebar.tsx",
            lineNumber: 67,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/Sidebar.tsx",
        lineNumber: 66,
        columnNumber: 5
    }, this);
};
_s2(Sidebar, "MZh2xlb+yyJQ+ixme569j2yuOX0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useTranslation"]
    ];
});
_c2 = Sidebar;
const __TURBOPACK__default__export__ = Sidebar;
var _c, _c1, _c2;
__turbopack_refresh__.register(_c, "RouteNormal");
__turbopack_refresh__.register(_c1, "RouteGroup");
__turbopack_refresh__.register(_c2, "Sidebar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/LanguageDropdown.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
/* eslint-disable @next/next/no-img-element */ __turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/react-i18next/dist/es/index.js [client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react-i18next/dist/es/useTranslation.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$dropdown$2f$dist$2f$chunk$2d$KQ5CH2X7$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__dropdown_default__as__Dropdown$3e$__ = __turbopack_import__("[project]/node_modules/@heroui/dropdown/dist/chunk-KQ5CH2X7.mjs [client] (ecmascript) <export dropdown_default as Dropdown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$dropdown$2f$dist$2f$chunk$2d$4LJ2IKXJ$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__dropdown_trigger_default__as__DropdownTrigger$3e$__ = __turbopack_import__("[project]/node_modules/@heroui/dropdown/dist/chunk-4LJ2IKXJ.mjs [client] (ecmascript) <export dropdown_trigger_default as DropdownTrigger>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$dropdown$2f$dist$2f$chunk$2d$UIQ4674R$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__dropdown_menu_default__as__DropdownMenu$3e$__ = __turbopack_import__("[project]/node_modules/@heroui/dropdown/dist/chunk-UIQ4674R.mjs [client] (ecmascript) <export dropdown_menu_default as DropdownMenu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$menu$2f$dist$2f$chunk$2d$BIY4SM4Z$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__menu_item_base_default__as__DropdownItem$3e$__ = __turbopack_import__("[project]/node_modules/@heroui/menu/dist/chunk-BIY4SM4Z.mjs [client] (ecmascript) <export menu_item_base_default as DropdownItem>");
;
var _s = __turbopack_refresh__.signature();
;
;
const languagues = {
    en: {
        label: "EN",
        flag: "https://www.worldometers.info//img/flags/small/tn_us-flag.gif"
    },
    es: {
        label: "ES",
        flag: "https://www.worldometers.info//img/flags/small/tn_mx-flag.gif"
    }
};
const Language = (props)=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-2 border py-1 px-2 border-gray-800 rounded-md hover:cursor-pointer",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                src: props.flag,
                alt: "flag",
                className: "w-4"
            }, void 0, false, {
                fileName: "[project]/src/components/LanguageDropdown.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this),
            " ",
            props.label
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/LanguageDropdown.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, this);
};
_c = Language;
const LanguageDropdown = ()=>{
    _s();
    const { i18n } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useTranslation"])();
    const onAction = (key)=>{
        localStorage.setItem("i18nextLng", key);
        if (key == "en") {
            i18n.changeLanguage("en");
        }
        if (key == "es") {
            i18n.changeLanguage("es");
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$dropdown$2f$dist$2f$chunk$2d$KQ5CH2X7$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__dropdown_default__as__Dropdown$3e$__["Dropdown"], {
        placement: "bottom-end",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$dropdown$2f$dist$2f$chunk$2d$4LJ2IKXJ$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__dropdown_trigger_default__as__DropdownTrigger$3e$__["DropdownTrigger"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Language, {
                        ...languagues[i18n.language]
                    }, void 0, false, {
                        fileName: "[project]/src/components/LanguageDropdown.tsx",
                        lineNumber: 46,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/LanguageDropdown.tsx",
                    lineNumber: 45,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/LanguageDropdown.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$dropdown$2f$dist$2f$chunk$2d$UIQ4674R$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__dropdown_menu_default__as__DropdownMenu$3e$__["DropdownMenu"], {
                "aria-label": "Profile Actions",
                variant: "flat",
                disabledKeys: [
                    "profile"
                ],
                onAction: onAction,
                children: Object.keys(languagues).map((key)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$menu$2f$dist$2f$chunk$2d$BIY4SM4Z$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__menu_item_base_default__as__DropdownItem$3e$__["DropdownItem"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Language, {
                            ...languagues[key]
                        }, void 0, false, {
                            fileName: "[project]/src/components/LanguageDropdown.tsx",
                            lineNumber: 57,
                            columnNumber: 13
                        }, this)
                    }, key, false, {
                        fileName: "[project]/src/components/LanguageDropdown.tsx",
                        lineNumber: 56,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/LanguageDropdown.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/LanguageDropdown.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
};
_s(LanguageDropdown, "iD7vDB/EPQWin5ATG71yacngHuk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useTranslation"]
    ];
});
_c1 = LanguageDropdown;
const __TURBOPACK__default__export__ = LanguageDropdown;
var _c, _c1;
__turbopack_refresh__.register(_c, "Language");
__turbopack_refresh__.register(_c1, "LanguageDropdown");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/Navbar.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "AcmeLogo": (()=>AcmeLogo),
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/image.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$UserDropdown$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/UserDropdown.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$routes$2f$index$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/routes/index.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Sidebar$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/Sidebar.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/react-i18next/dist/es/index.js [client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LanguageDropdown$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/LanguageDropdown.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$link$2f$dist$2f$chunk$2d$OPTZHMJX$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__link_default__as__Link$3e$__ = __turbopack_import__("[project]/node_modules/@heroui/link/dist/chunk-OPTZHMJX.mjs [client] (ecmascript) <export link_default as Link>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react-i18next/dist/es/useTranslation.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$navbar$2f$dist$2f$chunk$2d$C4N5PP4E$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__navbar_default__as__Navbar$3e$__ = __turbopack_import__("[project]/node_modules/@heroui/navbar/dist/chunk-C4N5PP4E.mjs [client] (ecmascript) <export navbar_default as Navbar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$navbar$2f$dist$2f$chunk$2d$UYTDJMPP$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__navbar_content_default__as__NavbarContent$3e$__ = __turbopack_import__("[project]/node_modules/@heroui/navbar/dist/chunk-UYTDJMPP.mjs [client] (ecmascript) <export navbar_content_default as NavbarContent>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$navbar$2f$dist$2f$chunk$2d$M6Y4IXO7$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__navbar_menu_toggle_default__as__NavbarMenuToggle$3e$__ = __turbopack_import__("[project]/node_modules/@heroui/navbar/dist/chunk-M6Y4IXO7.mjs [client] (ecmascript) <export navbar_menu_toggle_default as NavbarMenuToggle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$navbar$2f$dist$2f$chunk$2d$4DMBHLGU$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__navbar_brand_default__as__NavbarBrand$3e$__ = __turbopack_import__("[project]/node_modules/@heroui/navbar/dist/chunk-4DMBHLGU.mjs [client] (ecmascript) <export navbar_brand_default as NavbarBrand>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$navbar$2f$dist$2f$chunk$2d$5LMKFFWA$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__navbar_item_default__as__NavbarItem$3e$__ = __turbopack_import__("[project]/node_modules/@heroui/navbar/dist/chunk-5LMKFFWA.mjs [client] (ecmascript) <export navbar_item_default as NavbarItem>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$navbar$2f$dist$2f$chunk$2d$ODHE2HZV$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__navbar_menu_default__as__NavbarMenu$3e$__ = __turbopack_import__("[project]/node_modules/@heroui/navbar/dist/chunk-ODHE2HZV.mjs [client] (ecmascript) <export navbar_menu_default as NavbarMenu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$navbar$2f$dist$2f$chunk$2d$W4R67QGI$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__navbar_menu_item_default__as__NavbarMenuItem$3e$__ = __turbopack_import__("[project]/node_modules/@heroui/navbar/dist/chunk-W4R67QGI.mjs [client] (ecmascript) <export navbar_menu_item_default as NavbarMenuItem>");
;
var _s = __turbopack_refresh__.signature();
;
;
;
;
;
;
;
;
;
const AcmeLogo = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$link$2f$dist$2f$chunk$2d$OPTZHMJX$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__link_default__as__Link$3e$__["Link"], {
        href: "/",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
            src: "/img/logo-inverse.svg",
            height: 30,
            width: 100,
            alt: "logo"
        }, void 0, false, {
            fileName: "[project]/src/components/Navbar.tsx",
            lineNumber: 22,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/Navbar.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
};
_c = AcmeLogo;
const LayoutNavbar = ()=>{
    _s();
    const [isMenuOpen, setIsMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const i18n = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useTranslation"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$navbar$2f$dist$2f$chunk$2d$C4N5PP4E$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__navbar_default__as__Navbar$3e$__["Navbar"], {
        isMenuOpen: isMenuOpen,
        onMenuOpenChange: setIsMenuOpen,
        isBordered: true,
        maxWidth: "full",
        className: "",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$navbar$2f$dist$2f$chunk$2d$UYTDJMPP$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__navbar_content_default__as__NavbarContent$3e$__["NavbarContent"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$navbar$2f$dist$2f$chunk$2d$M6Y4IXO7$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__navbar_menu_toggle_default__as__NavbarMenuToggle$3e$__["NavbarMenuToggle"], {
                        "aria-label": isMenuOpen ? "Close menu" : "Open menu",
                        className: "xl:hidden"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Navbar.tsx",
                        lineNumber: 41,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$navbar$2f$dist$2f$chunk$2d$4DMBHLGU$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__navbar_brand_default__as__NavbarBrand$3e$__["NavbarBrand"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AcmeLogo, {}, void 0, false, {
                            fileName: "[project]/src/components/Navbar.tsx",
                            lineNumber: 46,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/Navbar.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Navbar.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$navbar$2f$dist$2f$chunk$2d$UYTDJMPP$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__navbar_content_default__as__NavbarContent$3e$__["NavbarContent"], {
                justify: "end",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LanguageDropdown$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/src/components/Navbar.tsx",
                        lineNumber: 51,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$navbar$2f$dist$2f$chunk$2d$5LMKFFWA$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__navbar_item_default__as__NavbarItem$3e$__["NavbarItem"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$UserDropdown$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                            fileName: "[project]/src/components/Navbar.tsx",
                            lineNumber: 54,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/Navbar.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Navbar.tsx",
                lineNumber: 50,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$navbar$2f$dist$2f$chunk$2d$ODHE2HZV$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__navbar_menu_default__as__NavbarMenu$3e$__["NavbarMenu"], {
                className: "bg-[#18181b] pb-[env(safe-area-inset-bottom)]",
                style: {
                    width: '100vw',
                    maxWidth: '100%',
                    height: '100dvh',
                    overflowY: 'auto'
                },
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$routes$2f$index$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["ROUTES"])(i18n).map((route, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$navbar$2f$dist$2f$chunk$2d$W4R67QGI$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__navbar_menu_item_default__as__NavbarMenuItem$3e$__["NavbarMenuItem"], {
                        children: route.children ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Sidebar$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["RouteGroup"], {
                            route: route
                        }, route.key, false, {
                            fileName: "[project]/src/components/Navbar.tsx",
                            lineNumber: 63,
                            columnNumber: 15
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Sidebar$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["RouteNormal"], {
                            route: route
                        }, route.key, false, {
                            fileName: "[project]/src/components/Navbar.tsx",
                            lineNumber: 65,
                            columnNumber: 15
                        }, this)
                    }, route.key, false, {
                        fileName: "[project]/src/components/Navbar.tsx",
                        lineNumber: 61,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/Navbar.tsx",
                lineNumber: 58,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Navbar.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
};
_s(LayoutNavbar, "/HHNOOcbfCRKOz/wg+MmEUbZuAc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useTranslation"]
    ];
});
_c1 = LayoutNavbar;
const __TURBOPACK__default__export__ = LayoutNavbar;
var _c, _c1;
__turbopack_refresh__.register(_c, "AcmeLogo");
__turbopack_refresh__.register(_c1, "LayoutNavbar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/views/Footer.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/link.js [client] (ecmascript)");
;
;
const Footer = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex justify-between w-full p-4 border-t  border-t-gray-700",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-wrap justify-between w-full",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/public/terms_es.pdf",
                                className: "text-blue-400 underline",
                                children: "Terms and Conditions"
                            }, void 0, false, {
                                fileName: "[project]/src/components/views/Footer.tsx",
                                lineNumber: 9,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/views/Footer.tsx",
                            lineNumber: 8,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/public/privacy_policy_es.pdf",
                                className: "text-blue-400 underline",
                                children: "Privacy"
                            }, void 0, false, {
                                fileName: "[project]/src/components/views/Footer.tsx",
                                lineNumber: 17,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/views/Footer.tsx",
                            lineNumber: 16,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/views/Footer.tsx",
                    lineNumber: 7,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-1 text-gray-500",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "Developed by"
                        }, void 0, false, {
                            fileName: "[project]/src/components/views/Footer.tsx",
                            lineNumber: 26,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "https://www.luthorsolutions.com/",
                            children: "Luthor Solutions"
                        }, void 0, false, {
                            fileName: "[project]/src/components/views/Footer.tsx",
                            lineNumber: 27,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/views/Footer.tsx",
                    lineNumber: 25,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-gray-500",
                    children: [
                        " ",
                        "© 2025, Dota. All rights reserved"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/views/Footer.tsx",
                    lineNumber: 29,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/views/Footer.tsx",
            lineNumber: 6,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/views/Footer.tsx",
        lineNumber: 5,
        columnNumber: 5
    }, this);
};
_c = Footer;
const __TURBOPACK__default__export__ = Footer;
var _c;
__turbopack_refresh__.register(_c, "Footer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/layouts/loading.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$spinner$2f$dist$2f$chunk$2d$MQ3ILONP$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__spinner_default__as__Spinner$3e$__ = __turbopack_import__("[project]/node_modules/@heroui/spinner/dist/chunk-MQ3ILONP.mjs [client] (ecmascript) <export spinner_default as Spinner>");
;
;
const LoadingScreen = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-screen w-screen flex items-center justify-center",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$spinner$2f$dist$2f$chunk$2d$MQ3ILONP$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__spinner_default__as__Spinner$3e$__["Spinner"], {
            size: "lg"
        }, void 0, false, {
            fileName: "[project]/src/layouts/loading.tsx",
            lineNumber: 6,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/layouts/loading.tsx",
        lineNumber: 5,
        columnNumber: 5
    }, this);
};
_c = LoadingScreen;
const __TURBOPACK__default__export__ = LoadingScreen;
var _c;
__turbopack_refresh__.register(_c, "LoadingScreen");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/services/index.ts [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/axios/lib/axios.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
;
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].defaults.baseURL = ("TURBOPACK compile-time value", "https://dota-api-1039762081728.us-central1.run.app");
const BASE_URL = ("TURBOPACK compile-time value", "https://dota-api-1039762081728.us-central1.run.app");
const axiosInstance = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].create({
    baseURL: BASE_URL
});
const __TURBOPACK__default__export__ = axiosInstance;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/context/auth.context.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$layouts$2f$loading$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/layouts/loading.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/services/index.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next-auth/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/navigation.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/index.js [client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
;
;
;
;
;
const AuthContext = (props)=>{
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { data, status } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useSession"])({
        required: true,
        onUnauthenticated: {
            "AuthContext.useSession": ()=>{
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["signOut"])();
                router.replace("/login");
            }
        }["AuthContext.useSession"]
    });
    const axiosInited = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AuthContext.useMemo[axiosInited]": ()=>{
            if (status == "authenticated") {
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["default"].defaults.headers.Authorization = `Bearer ${data?.accessToken}`;
                return true;
            }
            return false;
        }
    }["AuthContext.useMemo[axiosInited]"], [
        status
    ]);
    if (!axiosInited) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$layouts$2f$loading$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
        fileName: "[project]/src/context/auth.context.tsx",
        lineNumber: 29,
        columnNumber: 28
    }, this);
    return props.children;
};
_s(AuthContext, "B0A+sTFJLJH0IzMU3p1XgGKSzUg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useSession"]
    ];
});
_c = AuthContext;
const __TURBOPACK__default__export__ = AuthContext;
var _c;
__turbopack_refresh__.register(_c, "AuthContext");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/layouts/main.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Navbar$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/Navbar.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Sidebar$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/Sidebar.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$views$2f$Footer$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/views/Footer.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$auth$2e$context$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/context/auth.context.tsx [client] (ecmascript)");
;
;
;
;
;
const MainLayout = ({ children })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$auth$2e$context$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex flex-col",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Navbar$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/src/layouts/main.tsx",
                    lineNumber: 15,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 xl:grid-cols-[300px_1fr] 2xl:grid-cols-[400px_1fr] flex-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "hidden xl:block",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Sidebar$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                fileName: "[project]/src/layouts/main.tsx",
                                lineNumber: 18,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/layouts/main.tsx",
                            lineNumber: 17,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-4 w-screen lg:w-auto 2xl:p-8",
                            children: children
                        }, void 0, false, {
                            fileName: "[project]/src/layouts/main.tsx",
                            lineNumber: 20,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/layouts/main.tsx",
                    lineNumber: 16,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$views$2f$Footer$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/src/layouts/main.tsx",
                    lineNumber: 22,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/layouts/main.tsx",
            lineNumber: 14,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/layouts/main.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
};
_c = MainLayout;
const __TURBOPACK__default__export__ = MainLayout;
var _c;
__turbopack_refresh__.register(_c, "MainLayout");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/views/trading/TradingView.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
/* eslint-disable no-var */ __turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dynamic$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dynamic.js [client] (ecmascript)");
;
;
const SingleTicker = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dynamic$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_require__("[project]/node_modules/react-ts-tradingview-widgets/dist/index.js [client] (ecmascript, async loader)")(__turbopack_import__).then((w)=>w.SingleTicker), {
    loadableGenerated: {
        modules: [
            "src/components/views/trading/TradingView.tsx -> " + "react-ts-tradingview-widgets"
        ]
    },
    ssr: false
});
_c = SingleTicker;
const TradingViewWidget = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid grid-cols-1 xl:grid-cols-4 w-full gap-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SingleTicker, {
                    colorTheme: "dark",
                    width: "100%",
                    symbol: "FOREXCOM:NSXUSD"
                }, void 0, false, {
                    fileName: "[project]/src/components/views/trading/TradingView.tsx",
                    lineNumber: 15,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/views/trading/TradingView.tsx",
                lineNumber: 14,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SingleTicker, {
                    colorTheme: "dark",
                    width: "100%",
                    symbol: "FX_IDC:EURUSD"
                }, void 0, false, {
                    fileName: "[project]/src/components/views/trading/TradingView.tsx",
                    lineNumber: 22,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/views/trading/TradingView.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SingleTicker, {
                    colorTheme: "dark",
                    width: "100%",
                    symbol: "BITSTAMP:BTCUSD"
                }, void 0, false, {
                    fileName: "[project]/src/components/views/trading/TradingView.tsx",
                    lineNumber: 29,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/views/trading/TradingView.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SingleTicker, {
                    colorTheme: "dark",
                    width: "100%",
                    symbol: "BITSTAMP:ETHUSD"
                }, void 0, false, {
                    fileName: "[project]/src/components/views/trading/TradingView.tsx",
                    lineNumber: 36,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/views/trading/TradingView.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/views/trading/TradingView.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
};
_c1 = TradingViewWidget;
const __TURBOPACK__default__export__ = TradingViewWidget;
var _c, _c1;
__turbopack_refresh__.register(_c, "SingleTicker");
__turbopack_refresh__.register(_c1, "TradingViewWidget");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/utils/cards/Card.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
;
const CardDota = ({ ...props })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `border border-1 p-4 relative rounded-lg border-[#3f3f3f] ${props.classNames}`,
        children: props.children
    }, void 0, false, {
        fileName: "[project]/src/components/utils/cards/Card.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
};
_c = CardDota;
const __TURBOPACK__default__export__ = CardDota;
var _c;
__turbopack_refresh__.register(_c, "CardDota");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/utils/cards/CardBanner.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
;
const CardBanner = ({ ...props })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `border border-1 relative rounded-lg border-[#3f3f3f] flex flex-col justify-${props?.position == "top" ? "start" : "end"}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    className: "rounded-lg",
                    src: props.img || "",
                    alt: props?.img ? props.img : "Sin imagen"
                }, void 0, false, {
                    fileName: "[project]/src/components/utils/cards/CardBanner.tsx",
                    lineNumber: 17,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/utils/cards/CardBanner.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute p-4 px-14 gap-4 flex flex-col text-center items-center w-full",
                children: props.children
            }, void 0, false, {
                fileName: "[project]/src/components/utils/cards/CardBanner.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/utils/cards/CardBanner.tsx",
        lineNumber: 11,
        columnNumber: 5
    }, this);
};
_c = CardBanner;
const __TURBOPACK__default__export__ = CardBanner;
var _c;
__turbopack_refresh__.register(_c, "CardBanner");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/utils/cards/ButtonDota.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$spinner$2f$dist$2f$chunk$2d$MQ3ILONP$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__spinner_default__as__Spinner$3e$__ = __turbopack_import__("[project]/node_modules/@heroui/spinner/dist/chunk-MQ3ILONP.mjs [client] (ecmascript) <export spinner_default as Spinner>");
;
;
const ButtonDota = ({ ...props })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        disabled: props.disabled,
        onClick: props.onClick,
        className: `
            ${props?.classNames}
            border 
        border-[1px] 
        border-white 
        p-3 px-6 flex 
        items-center 
        cursor-pointer 
        justify-center 
        transition ease-in-out delay-150  hover:scale-105  duration-200 hover:border-[#DADADA] rounded-${props?.rounded ? props.rounded : "sm"}`,
        children: [
            props.loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$spinner$2f$dist$2f$chunk$2d$MQ3ILONP$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__spinner_default__as__Spinner$3e$__["Spinner"], {}, void 0, false, {
                fileName: "[project]/src/components/utils/cards/ButtonDota.tsx",
                lineNumber: 31,
                columnNumber: 25
            }, this),
            props.children
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/utils/cards/ButtonDota.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
};
_c = ButtonDota;
const __TURBOPACK__default__export__ = ButtonDota;
var _c;
__turbopack_refresh__.register(_c, "ButtonDota");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/hooks/useAxios.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/services/index.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
var _s = __turbopack_refresh__.signature();
;
;
const useAxios = ({ url, postData, method = "get", defaultValue }, dependencies = [])=>{
    _s();
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(defaultValue || null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const exec = async ()=>{
        setLoading(true);
        try {
            const response = await (method == "get" ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["default"][method](`${("TURBOPACK compile-time value", "https://dota-api-1039762081728.us-central1.run.app")}/${url}`) : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["default"][method](`${("TURBOPACK compile-time value", "https://dota-api-1039762081728.us-central1.run.app")}/${url}`, postData));
            setData(response.data);
        } catch (err) {
            setData(null);
        } finally{
            setLoading(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useAxios.useEffect": ()=>{
            exec();
        }
    }["useAxios.useEffect"], dependencies);
    return {
        data,
        loading,
        refetch: exec
    };
};
_s(useAxios, "LOBIGfrOQo7RzCui4WDm5qFC3FE=");
const __TURBOPACK__default__export__ = useAxios;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/views/dashboard/components/Links.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$utils$2f$cards$2f$ButtonDota$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/utils/cards/ButtonDota.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$utils$2f$cards$2f$Card$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/utils/cards/Card.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAxios$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/hooks/useAxios.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$classnames$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/classnames/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react-hot-toast/dist/index.mjs [client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
;
;
;
;
;
;
const Link = (props)=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$classnames$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])("border cursor-pointer flex items-center w-full justify-center transition ease-in-out delay-150 hover:border-r-0 duration-200 hover:border-[#DADADA] hover:scale-110 overflow-hidden hover:bg-white hover:text-black", props.position == props.activePosition && "bg-primary", props.className),
        onClick: props.onClick,
        children: props.children
    }, void 0, false, {
        fileName: "[project]/src/components/views/dashboard/components/Links.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
};
_c = Link;
const Links = ({ i18n })=>{
    _s();
    const [position, setPosition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const { data: user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAxios$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"])({
        url: "users/me",
        method: "get"
    });
    const [host, setHost] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Links.useEffect": ()=>{
            setHost(window.location.host);
        }
    }["Links.useEffect"], []);
    const copyToClipboard = async ()=>{
        if (user?.id) {
            const linkCopied = `https://${host}/signup/${user.id}/${position == "left" ? user.left : user.right}`;
            await navigator.clipboard.writeText(linkCopied);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["default"].success("Url copiado con éxito");
            return linkCopied;
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$utils$2f$cards$2f$Card$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
            classNames: "flex flex-col gap-4 items-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col items-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-lg",
                            children: i18n.t("dashboard_view.banner_referral.referral_link")
                        }, void 0, false, {
                            fileName: "[project]/src/components/views/dashboard/components/Links.tsx",
                            lineNumber: 63,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Link, {
                                    activePosition: position,
                                    position: "left",
                                    className: "rounded-l-lg",
                                    onClick: ()=>{
                                        setPosition("left");
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "py-3 px-6",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-bold",
                                            children: [
                                                " ",
                                                i18n.t("dashboard_view.banner_referral.left")
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/views/dashboard/components/Links.tsx",
                                            lineNumber: 76,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/views/dashboard/components/Links.tsx",
                                        lineNumber: 75,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/views/dashboard/components/Links.tsx",
                                    lineNumber: 67,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Link, {
                                    activePosition: position,
                                    position: "right",
                                    className: "rounded-r-lg",
                                    onClick: ()=>{
                                        setPosition("right");
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "py-3 px-6",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-bold",
                                            children: [
                                                " ",
                                                i18n.t("dashboard_view.banner_referral.right")
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/views/dashboard/components/Links.tsx",
                                            lineNumber: 91,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/views/dashboard/components/Links.tsx",
                                        lineNumber: 90,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/views/dashboard/components/Links.tsx",
                                    lineNumber: 82,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/views/dashboard/components/Links.tsx",
                            lineNumber: 66,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/views/dashboard/components/Links.tsx",
                    lineNumber: 62,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$utils$2f$cards$2f$Card$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                    classNames: "flex items-center justify-center w-full",
                    children: position ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-center",
                        children: [
                            i18n.t("dashboard_view.banner_referral.we_will"),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                fileName: "[project]/src/components/views/dashboard/components/Links.tsx",
                                lineNumber: 103,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-bold uppercase",
                                children: position == "left" ? i18n.t("dashboard_view.banner_referral.left") : i18n.t("dashboard_view.banner_referral.right")
                            }, void 0, false, {
                                fileName: "[project]/src/components/views/dashboard/components/Links.tsx",
                                lineNumber: 104,
                                columnNumber: 15
                            }, this),
                            " ",
                            i18n.t("dashboard_view.banner_referral.side")
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/views/dashboard/components/Links.tsx",
                        lineNumber: 101,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: i18n.t("dashboard_view.banner_referral.choose_the_placement")
                    }, void 0, false, {
                        fileName: "[project]/src/components/views/dashboard/components/Links.tsx",
                        lineNumber: 112,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/views/dashboard/components/Links.tsx",
                    lineNumber: 99,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-4 w-full",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$utils$2f$cards$2f$ButtonDota$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                        disabled: !position,
                        rounded: "lg",
                        classNames: "w-full bg-primary font-bold hover:bg-secondary",
                        onClick: ()=>copyToClipboard(),
                        children: i18n.t("dashboard_view.banner_referral.copy")
                    }, void 0, false, {
                        fileName: "[project]/src/components/views/dashboard/components/Links.tsx",
                        lineNumber: 118,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/views/dashboard/components/Links.tsx",
                    lineNumber: 117,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/views/dashboard/components/Links.tsx",
            lineNumber: 61,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/views/dashboard/components/Links.tsx",
        lineNumber: 60,
        columnNumber: 5
    }, this);
};
_s(Links, "fkkQU/lcR0Po1qV3Ujhztvo7D00=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAxios$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"]
    ];
});
_c1 = Links;
const __TURBOPACK__default__export__ = Links;
var _c, _c1;
__turbopack_refresh__.register(_c, "Link");
__turbopack_refresh__.register(_c1, "Links");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/views/dashboard/components/RanksDashboard.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
/* eslint-disable @next/next/no-img-element */ __turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$utils$2f$cards$2f$Card$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/utils/cards/Card.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAxios$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/hooks/useAxios.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next-auth/react/index.js [client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
;
;
;
const RankDashboard = ({ i18n })=>{
    _s();
    const { data } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useSession"])();
    const { data: rank } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAxios$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"])({
        url: "ranks/getUserRank",
        method: "post",
        postData: {
            id_user: data?.user?.id
        },
        defaultValue: {}
    }, [
        data?.user?.id
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$utils$2f$cards$2f$Card$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
        classNames: "flex flex-col gap-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-3xl font-bold text-dota",
                    children: i18n.t("dashboard_view.rank_banner.current_rank")
                }, void 0, false, {
                    fileName: "[project]/src/components/views/dashboard/components/RanksDashboard.tsx",
                    lineNumber: 30,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/views/dashboard/components/RanksDashboard.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "mb-2 font-bold",
                                children: rank?.rank?.display
                            }, void 0, false, {
                                fileName: "[project]/src/components/views/dashboard/components/RanksDashboard.tsx",
                                lineNumber: 36,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: `/img/ranks/${rank?.order || "0"}.png`,
                                className: "w-[100px] rounded-lg",
                                alt: ""
                            }, void 0, false, {
                                fileName: "[project]/src/components/views/dashboard/components/RanksDashboard.tsx",
                                lineNumber: 37,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "bg-primary text-white font-bold px-2 py-1 rounded-lg text-center shadow-md shadow-gray-500",
                                children: [
                                    i18n.t("dashboard_view.rank_banner.rank"),
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                        fileName: "[project]/src/components/views/dashboard/components/RanksDashboard.tsx",
                                        lineNumber: 43,
                                        columnNumber: 57
                                    }, this),
                                    i18n.t("dashboard_view.rank_banner.classified")
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/views/dashboard/components/RanksDashboard.tsx",
                                lineNumber: 42,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/views/dashboard/components/RanksDashboard.tsx",
                        lineNumber: 35,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col items-end",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-lg",
                                        children: i18n.t("dashboard_view.rank_banner.left_points")
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/views/dashboard/components/RanksDashboard.tsx",
                                        lineNumber: 49,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-primary",
                                        children: rank?.points?.left
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/views/dashboard/components/RanksDashboard.tsx",
                                        lineNumber: 52,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/views/dashboard/components/RanksDashboard.tsx",
                                lineNumber: 48,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col items-end",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-lg",
                                        children: i18n.t("dashboard_view.rank_banner.right_points")
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/views/dashboard/components/RanksDashboard.tsx",
                                        lineNumber: 56,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-primary",
                                        children: rank?.points?.right
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/views/dashboard/components/RanksDashboard.tsx",
                                        lineNumber: 59,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/views/dashboard/components/RanksDashboard.tsx",
                                lineNumber: 55,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col items-end",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-lg",
                                        children: i18n.t("dashboard_view.rank_banner.shorter_leg")
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/views/dashboard/components/RanksDashboard.tsx",
                                        lineNumber: 63,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-primary lowercase ",
                                        children: rank?.points?.smaller == "left" ? i18n.t("dashboard_view.banner_referral.left") : i18n.t("dashboard_view.banner_referral.right")
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/views/dashboard/components/RanksDashboard.tsx",
                                        lineNumber: 66,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/views/dashboard/components/RanksDashboard.tsx",
                                lineNumber: 62,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/views/dashboard/components/RanksDashboard.tsx",
                        lineNumber: 47,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/views/dashboard/components/RanksDashboard.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/views/dashboard/components/RanksDashboard.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
};
_s(RankDashboard, "T7QRjpCiLbsLvBMMWOq6bB9MpGY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useSession"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAxios$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"]
    ];
});
_c = RankDashboard;
const __TURBOPACK__default__export__ = RankDashboard;
var _c;
__turbopack_refresh__.register(_c, "RankDashboard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/views/dashboard/components/NextRank.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
/* eslint-disable @next/next/no-img-element */ __turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$utils$2f$cards$2f$Card$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/utils/cards/Card.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAxios$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/hooks/useAxios.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next-auth/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$progress$2f$dist$2f$chunk$2d$CXOJTH5M$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__progress_default__as__Progress$3e$__ = __turbopack_import__("[project]/node_modules/@heroui/progress/dist/chunk-CXOJTH5M.mjs [client] (ecmascript) <export progress_default as Progress>");
;
var _s = __turbopack_refresh__.signature();
;
;
;
;
;
const NextRank = ({ i18n })=>{
    _s();
    const { data } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useSession"])();
    const [nextRank, setNextRank] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const { data: ranks } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAxios$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"])({
        url: "ranks/list",
        method: "get"
    });
    const { data: rank } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAxios$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"])({
        url: "ranks/getUserRank",
        method: "post",
        postData: {
            id_user: data?.user?.id
        },
        defaultValue: {}
    }, [
        data?.user?.id
    ]);
    const calculateNextRank = ()=>{
        if (!rank || !ranks) return null;
        const nextRank = Object.values(ranks).find((r)=>r.order == rank.order + 1);
        setNextRank(nextRank || null);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NextRank.useEffect": ()=>{
            calculateNextRank();
        }
    }["NextRank.useEffect"], [
        rank,
        ranks
    ]);
    const percent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "NextRank.useMemo[percent]": ()=>{
            if (!rank) return 0;
            if (!nextRank) return 0;
            return rank?.points[rank?.points.smaller] / nextRank?.points * 100;
        }
    }["NextRank.useMemo[percent]"], [
        rank,
        nextRank
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$utils$2f$cards$2f$Card$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
        classNames: "flex flex-col gap-1 items-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-3xl font-bold text-dota",
                    children: i18n.t("dashboard_view.rank_banner.next_rank")
                }, void 0, false, {
                    fileName: "[project]/src/components/views/dashboard/components/NextRank.tsx",
                    lineNumber: 55,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/views/dashboard/components/NextRank.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between items-center w-full",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-2 items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: `/img/ranks/${rank?.order || "0"}.png`,
                                className: "w-[100px] rounded-full",
                                alt: ""
                            }, void 0, false, {
                                fileName: "[project]/src/components/views/dashboard/components/NextRank.tsx",
                                lineNumber: 64,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[12px]",
                                children: i18n.t("dashboard_view.rank_banner.current_rank")
                            }, void 0, false, {
                                fileName: "[project]/src/components/views/dashboard/components/NextRank.tsx",
                                lineNumber: 69,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xl",
                                children: rank?.rank?.display || "Sin rango"
                            }, void 0, false, {
                                fileName: "[project]/src/components/views/dashboard/components/NextRank.tsx",
                                lineNumber: 72,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/views/dashboard/components/NextRank.tsx",
                        lineNumber: 63,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-2 items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: `/img/ranks/${nextRank?.order || "0"}.png`,
                                className: "w-[100px] rounded-full",
                                alt: ""
                            }, void 0, false, {
                                fileName: "[project]/src/components/views/dashboard/components/NextRank.tsx",
                                lineNumber: 75,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[12px]",
                                children: i18n.t("dashboard_view.rank_banner.next_rank")
                            }, void 0, false, {
                                fileName: "[project]/src/components/views/dashboard/components/NextRank.tsx",
                                lineNumber: 80,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xl",
                                children: nextRank?.display || "Sin rango"
                            }, void 0, false, {
                                fileName: "[project]/src/components/views/dashboard/components/NextRank.tsx",
                                lineNumber: 83,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/views/dashboard/components/NextRank.tsx",
                        lineNumber: 74,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/views/dashboard/components/NextRank.tsx",
                lineNumber: 62,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$progress$2f$dist$2f$chunk$2d$CXOJTH5M$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__progress_default__as__Progress$3e$__["Progress"], {
                value: percent
            }, void 0, false, {
                fileName: "[project]/src/components/views/dashboard/components/NextRank.tsx",
                lineNumber: 86,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between w-full",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: rank?.rank?.points || 0
                    }, void 0, false, {
                        fileName: "[project]/src/components/views/dashboard/components/NextRank.tsx",
                        lineNumber: 88,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: i18n.t("dashboard_view.rank_banner.shorter_leg")
                    }, void 0, false, {
                        fileName: "[project]/src/components/views/dashboard/components/NextRank.tsx",
                        lineNumber: 89,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: nextRank?.points || 0
                    }, void 0, false, {
                        fileName: "[project]/src/components/views/dashboard/components/NextRank.tsx",
                        lineNumber: 90,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/views/dashboard/components/NextRank.tsx",
                lineNumber: 87,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/views/dashboard/components/NextRank.tsx",
        lineNumber: 53,
        columnNumber: 5
    }, this);
};
_s(NextRank, "do7l/2PBhMezH68aPaHKqi7Nk3I=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useSession"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAxios$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAxios$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"]
    ];
});
_c = NextRank;
const __TURBOPACK__default__export__ = NextRank;
var _c;
__turbopack_refresh__.register(_c, "NextRank");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/utils/formats/formatNumbers.ts [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "formatNumberWithCommas": (()=>formatNumberWithCommas)
});
const formatNumberWithCommas = (rawNumber, decimals = -1, default_value, removeRightZeros = true)=>{
    if (!rawNumber && rawNumber !== 0) return default_value ?? '-';
    let text = (decimals == -1 ? rawNumber : (typeof rawNumber == 'number' ? rawNumber : parseFloat(rawNumber)).toFixed(decimals).replace(removeRightZeros ? /\.0+$/ : '', '')).toString();
    try {
        text = text.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
    } catch (Err) {
        console.error('REGEX NO SUPPORTED');
        text = Number(text).toLocaleString('en-US');
    }
    return text;
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/views/dashboard/components/InvestmentCard.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$utils$2f$cards$2f$Card$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/utils/cards/Card.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$utils$2f$formats$2f$formatNumbers$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/utils/formats/formatNumbers.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAxios$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/hooks/useAxios.tsx [client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
;
;
;
const InvestmentCard = ({ i18n })=>{
    _s();
    const { data } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAxios$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"])({
        url: "users/current-deposit",
        method: "get",
        defaultValue: "0"
    });
    const percent = data?.deposits ? data.deposits / data?.limit * 100 : 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$utils$2f$cards$2f$Card$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
        classNames: "flex flex-col gap-2 items-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-3xl font-bold text-dota",
                children: i18n.t("dashboard_view.portfolio_banner.portfolio")
            }, void 0, false, {
                fileName: "[project]/src/components/views/dashboard/components/InvestmentCard.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[12px] ",
                children: [
                    i18n.t("dashboard_view.portfolio_banner.add_value_up_to"),
                    " 10x"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/views/dashboard/components/InvestmentCard.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "Current"
                    }, void 0, false, {
                        fileName: "[project]/src/components/views/dashboard/components/InvestmentCard.tsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[12px]",
                        children: "$"
                    }, void 0, false, {
                        fileName: "[project]/src/components/views/dashboard/components/InvestmentCard.tsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[24px] font-bold",
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$utils$2f$formats$2f$formatNumbers$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["formatNumberWithCommas"])(data?.deposits, 0)
                    }, void 0, false, {
                        fileName: "[project]/src/components/views/dashboard/components/InvestmentCard.tsx",
                        lineNumber: 33,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[12px]",
                        children: "USD"
                    }, void 0, false, {
                        fileName: "[project]/src/components/views/dashboard/components/InvestmentCard.tsx",
                        lineNumber: 36,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/views/dashboard/components/InvestmentCard.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "Limit"
                    }, void 0, false, {
                        fileName: "[project]/src/components/views/dashboard/components/InvestmentCard.tsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[12px]",
                        children: "$"
                    }, void 0, false, {
                        fileName: "[project]/src/components/views/dashboard/components/InvestmentCard.tsx",
                        lineNumber: 40,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[24px] font-bold",
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$utils$2f$formats$2f$formatNumbers$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["formatNumberWithCommas"])(data?.limit, 0)
                    }, void 0, false, {
                        fileName: "[project]/src/components/views/dashboard/components/InvestmentCard.tsx",
                        lineNumber: 41,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[12px]",
                        children: "USD"
                    }, void 0, false, {
                        fileName: "[project]/src/components/views/dashboard/components/InvestmentCard.tsx",
                        lineNumber: 44,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/views/dashboard/components/InvestmentCard.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/views/dashboard/components/InvestmentCard.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, this);
};
_s(InvestmentCard, "qwQ6z/vM5P3UHzS6ycD4vpVbqwM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAxios$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"]
    ];
});
_c = InvestmentCard;
const __TURBOPACK__default__export__ = InvestmentCard;
var _c;
__turbopack_refresh__.register(_c, "InvestmentCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/constants.ts [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "DISPLAY": (()=>DISPLAY),
    "OPTIONS": (()=>OPTIONS),
    "RanksObject": (()=>RanksObject),
    "membershipRecord": (()=>membershipRecord),
    "orderTypes": (()=>orderTypes),
    "pares": (()=>pares),
    "paresRecord": (()=>paresRecord)
});
const DISPLAY = {
    "p-100": "100",
    "p-300": "300",
    "p-500": "500",
    "p-1000": "1000"
};
const RanksObject = (i18n)=>({
        none: {
            display: i18n?.t('rank_view.ranks.emprendedor') || "Emprendedor",
            key: "none",
            order: -1,
            ranks: [],
            start_points: 0,
            points: 0,
            binary_percent: 0.7,
            bonus: 0
        },
        contructor: {
            display: i18n?.t('rank_view.ranks.constructor') || "Constructor",
            key: "contructor",
            order: 0,
            ranks: [],
            start_points: 0,
            points: 5000,
            binary_percent: 0.7,
            bonus: 50
        },
        director: {
            display: i18n?.t('rank_view.ranks.director') || "Director",
            key: "director",
            order: 1,
            ranks: [],
            start_points: 5000,
            points: 15000,
            binary_percent: 0.7,
            bonus: 200
        },
        director_premier: {
            display: i18n?.t('rank_view.ranks.director_premier') || "Director Premier",
            key: "director_premier",
            order: 2,
            ranks: [],
            start_points: 20000,
            points: 30000,
            binary_percent: 0.7,
            bonus: 400
        },
        embajador: {
            display: i18n?.t('rank_view.ranks.embajador') || "Embajador",
            key: "embajador",
            order: 3,
            ranks: [],
            start_points: 50000,
            points: 60000,
            binary_percent: 0.7,
            bonus: 800
        },
        diamante: {
            display: i18n?.t('rank_view.ranks.diamond') || "Diamante",
            key: "diamante",
            order: 4,
            ranks: [],
            start_points: 110000,
            points: 150000,
            binary_percent: 0.8,
            bonus: 1500
        },
        diamante_ejecutivo: {
            display: i18n?.t('rank_view.ranks.ejecutive_diamond') || "Diamante Ejecutivo",
            key: "diamante_ejecutivo",
            order: 5,
            ranks: [],
            start_points: 260000,
            points: 300000,
            binary_percent: 0.8,
            bonus: 4000
        },
        diamante_premier: {
            display: i18n?.t('rank_view.ranks.premier_diamond') || "Diamante Premier",
            key: "diamante_premier",
            order: 6,
            ranks: [
                [
                    "diamante_ejecutivo",
                    "diamante_ejecutivo"
                ],
                [
                    "diamante_ejecutivo"
                ]
            ],
            start_points: 560000,
            points: 600000,
            binary_percent: 0.8,
            bonus: 8000
        },
        diamante_negro: {
            display: i18n?.t('rank_view.ranks.black_diamond') || "Diamante Negro",
            key: "diamante_negro",
            order: 7,
            ranks: [
                [
                    "diamante_premier",
                    "diamante_premier"
                ],
                [
                    "diamante_premier"
                ]
            ],
            start_points: 1160000,
            points: 1500000,
            binary_percent: 0.9,
            bonus: 20000
        },
        diamante_corona: {
            display: i18n?.t('rank_view.ranks.crown_diamond') || "Diamante Corona",
            key: "diamante_corona",
            order: 8,
            ranks: [
                [
                    "diamante_negro",
                    "diamante_negro"
                ],
                [
                    "diamante_negro",
                    "diamante_negro"
                ]
            ],
            start_points: 2660000,
            points: 5000000,
            binary_percent: 0.9,
            bonus: 100000
        },
        diamante_royal: {
            display: i18n?.t('rank_view.ranks.royal_diamond') || "Diamante Royal",
            key: "diamante_royal",
            order: 9,
            ranks: [
                [
                    "diamante_corona",
                    "diamante_corona"
                ],
                [
                    "diamante_corona",
                    "diamante_corona"
                ]
            ],
            start_points: 7660000,
            points: 8000000,
            binary_percent: 1,
            bonus: 200000
        }
    });
_c = RanksObject;
const membershipRecord = (i18n)=>({
        "p-100": {
            display: "Plan 100",
            key: "p-100",
            order: 1,
            value: "100",
            pros: [
                i18n?.t("purchases.membership.benefits.crypto_course") || "Curso Crypto",
                i18n?.t("purchases.membership.benefits.tokenomic_course") || "Curso Tokenomics",
                i18n?.t("purchases.membership.benefits.generates_up_to_3") || "Genera hasta 3x puntos",
                i18n?.t("purchases.membership.benefits.adds_value_up_to_10") || "Agrega valor hasta 10x de tu membresía"
            ],
            image: "/img/memberships/silver.png"
        },
        "p-300": {
            display: "Plan 300",
            key: "p-300",
            order: 2,
            value: "100",
            pros: [
                i18n?.t("purchases.membership.benefits.crypto_course") || "Curso Crypto",
                i18n?.t("purchases.membership.benefits.tokenomic_course") || "Curso Tokenomics",
                i18n?.t("purchases.membership.benefits.generates_up_to_3") || "Genera hasta 3x puntos",
                i18n?.t("purchases.membership.benefits.adds_value_up_to_10") || "Agrega valor hasta 10x de tu membresía"
            ],
            image: "/img/memberships/gold.png"
        },
        "p-500": {
            display: "Plan 500",
            key: "p-500",
            order: 3,
            value: "100",
            pros: [
                i18n?.t("purchases.membership.benefits.crypto_course") || "Curso Crypto",
                i18n?.t("purchases.membership.benefits.tokenomic_course") || "Curso Tokenomics",
                i18n?.t("purchases.membership.benefits.binance_trading_bot") || "Bot de Trading Binance",
                i18n?.t("purchases.membership.benefits.generates_up_to_3") || "Genera hasta 3x puntos",
                i18n?.t("purchases.membership.benefits.adds_value_up_to_10") || "Agrega valor hasta 10x de tu membresía"
            ],
            image: "/img/memberships/ruby.png"
        },
        "p-1000": {
            display: "Plan 1000",
            key: "p-1000",
            order: 4,
            value: "100",
            pros: [
                i18n?.t("purchases.membership.benefits.crypto_course") || "Curso Crypto",
                i18n?.t("purchases.membership.benefits.tokenomic_course") || "Curso Tokenomics",
                i18n?.t("purchases.membership.benefits.binance_trading_bot") || "Bot de Trading Binance",
                i18n?.t("purchases.membership.benefits.trading_signals") || "Señales de Trading",
                i18n?.t("purchases.membership.benefits.live_classes") || "Clases en Vivo",
                i18n?.t("purchases.membership.benefits.generates_up_to_3") || "Genera hasta 3x puntos",
                i18n?.t("purchases.membership.benefits.adds_value_up_to_10") || "Agrega valor hasta 10x de tu membresía"
            ],
            image: "/img/memberships/black.png"
        }
    });
const OPTIONS = [
    {
        label: DISPLAY["p-100"],
        value: "p-100",
        image: "/img/memberships/silver.png"
    },
    {
        label: DISPLAY["p-300"],
        value: "p-300",
        image: "/img/memberships/gold.png"
    },
    {
        label: DISPLAY["p-500"],
        value: "p-500",
        image: "/img/memberships/ruby.png"
    },
    {
        label: DISPLAY["p-1000"],
        value: "p-1000",
        image: "/img/memberships/black.png"
    }
];
const pares = [
    "AUD-CHF",
    "AUD-JPY",
    "AUD-NZD",
    "AUD-USD",
    "BTCUSD",
    "CAD-CHF",
    "CAD-JPY",
    "CHF-JPY",
    "EUR-AUD",
    "EUR-CAD",
    "EUR-CHF",
    "EUR-GBP",
    "EUR-JPY",
    "EUR-NZD",
    "EUR-USD",
    "GBP-AUD",
    "GBP-CAD",
    "GBP-CHF",
    "GBP-JPY",
    "GBP-NZD",
    "GBP-USD",
    "GOLD",
    "NZD-CAD",
    "NZD-CHF",
    "NZD-JPY",
    "NZD-USD",
    "US30",
    "US100",
    "US500",
    "USD-JPY",
    "USD-CAD",
    "USD-CHF"
];
const orderTypes = [
    {
        label: "SELL",
        value: "sell"
    },
    {
        label: "BUY",
        value: "buy"
    },
    {
        label: "SELL LIMIT",
        value: "sell_limit"
    },
    {
        label: "SELL STOP",
        value: "sell_stop"
    },
    {
        label: "BUY LIMIT",
        value: "buy_limit"
    },
    {
        label: "BUY STOP",
        value: "buy_stop"
    }
];
const paresRecord = {
    AUDCHF: {
        key: "AUDCHF",
        label: "AUD-CHF",
        categorie: "Forex"
    },
    AUDJPY: {
        key: "AUDJPY",
        label: "AUD-JPY",
        categorie: "Forex"
    },
    AUDNZD: {
        key: "AUDNZD",
        label: "AUD-NZD",
        categorie: "Forex"
    },
    AUDUSD: {
        key: "AUDUSD",
        label: "AUD-USD",
        categorie: "Forex"
    },
    BTCUSD: {
        key: "BTCUSD",
        label: "BTC-USD",
        categorie: "Crypto"
    },
    CADCHF: {
        key: "CADCHF",
        label: "CAD-CHF",
        categorie: "Forex"
    },
    CADJPY: {
        key: "CADJPY",
        label: "CAD-JPY",
        categorie: "Forex"
    },
    CHFJPY: {
        key: "CHFJPY",
        label: "CHF-JPY",
        categorie: "Forex"
    },
    EURAUD: {
        key: "EURAUD",
        label: "EUR-AUD",
        categorie: "Forex"
    },
    EURCAD: {
        key: "EURCAD",
        label: "EUR-CAD",
        categorie: "Forex"
    },
    EURCHF: {
        key: "EURCHF",
        label: "EUR-CHF",
        categorie: "Forex"
    },
    EURGBP: {
        key: "EURGBP",
        label: "EUR-GBP",
        categorie: "Forex"
    },
    EURJPY: {
        key: "EURJPY",
        label: "EUR-JPY",
        categorie: "Forex"
    },
    EURNZD: {
        key: "EURNZD",
        label: "EUR-NZD",
        categorie: "Forex"
    },
    EURUSD: {
        key: "EURUSD",
        label: "EUR-USD",
        categorie: "Forex"
    },
    GBPAUD: {
        key: "GBPAUD",
        label: "GBP-AUD",
        categorie: "Forex"
    },
    GBPCAD: {
        key: "GBPCAD",
        label: "GBP-CAD",
        categorie: "Forex"
    },
    GBPCHF: {
        key: "GBPCHF",
        label: "GBP-CHF",
        categorie: "Forex"
    },
    GBPJPY: {
        key: "GBPJPY",
        label: "GBP-JPY",
        categorie: "Forex"
    },
    GBPNZD: {
        key: "GBPNZD",
        label: "GBP-NZD",
        categorie: "Forex"
    },
    GBPUSD: {
        key: "GBPUSD",
        label: "GBP-USD",
        categorie: "Forex"
    },
    GOLD: {
        key: "GOLD",
        label: "GOLD",
        categorie: "Metal"
    },
    NZDCAD: {
        key: "NZDCAD",
        label: "NZD-CAD",
        categorie: "Forex"
    },
    NZDCHF: {
        key: "NZDCHF",
        label: "NZD-CHF",
        categorie: "Forex"
    },
    NZDJPY: {
        key: "NZDJPY",
        label: "NZD-JPY",
        categorie: "Forex"
    },
    NZDUSD: {
        key: "NZDUSD",
        label: "NZD-USD",
        categorie: "Forex"
    },
    US30: {
        key: "US30",
        label: "US30",
        categorie: "Indices"
    },
    US100: {
        key: "US100",
        label: "US100",
        categorie: "Indices"
    },
    US500: {
        key: "US500",
        label: "US500",
        categorie: "Indices"
    },
    USDJPY: {
        key: "USDJPY",
        label: "USD-JPY",
        categorie: "Forex"
    },
    USDCAD: {
        key: "USDCAD",
        label: "USD-CAD",
        categorie: "Forex"
    },
    USDCHF: {
        key: "USDCHF",
        label: "USD-CHF",
        categorie: "Forex"
    }
};
var _c;
__turbopack_refresh__.register(_c, "RanksObject");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/views/dashboard/components/Upgrade.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
/* eslint-disable @next/next/no-img-element */ __turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$utils$2f$cards$2f$Card$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/utils/cards/Card.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/constants.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAxios$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/hooks/useAxios.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/router.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$classnames$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/classnames/index.js [client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
;
;
;
;
;
const Upgrade = ({ i18n })=>{
    _s();
    const { data: membership } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAxios$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"])({
        url: "users/current-membership",
        method: "get",
        defaultValue: {
            membership: null
        }
    });
    const membership_object = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["membershipRecord"])(i18n);
    const sortedMemberships = Object.keys(membership_object);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const nextMembership = membership?.membership == null ? membership_object["p-100"].key : membership.membership && sortedMemberships.find((m)=>{
        return membership_object[m]?.order > membership_object[membership.membership]?.order;
    });
    const have_membership = Boolean(membership?.membership);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$utils$2f$cards$2f$Card$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
        classNames: "!border-white !p-0 flex items-center relative h-[250px]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                src: "/img/memberships/package-1.png",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$classnames$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])("w-full object-cover rounded-lg h-full", !have_membership && "opacity-40"),
                alt: ""
            }, void 0, false, {
                fileName: "[project]/src/components/views/dashboard/components/Upgrade.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute left-10 text-white font-outline font-bold text-2xl top-10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: membership?.membership ? `${i18n.t("dashboard_view.banner_upgrade.membership")} ${membership_object[membership.membership]?.display}` : "You have not a membership"
                }, void 0, false, {
                    fileName: "[project]/src/components/views/dashboard/components/Upgrade.tsx",
                    lineNumber: 51,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/views/dashboard/components/Upgrade.tsx",
                lineNumber: 50,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-0 p-4 flex items-center  backdrop-blur-lg w-full rounded-b-lg",
                children: nextMembership && membership_object[nextMembership] ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between w-full",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$classnames$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])("text-black w-80", !have_membership && "text-white"),
                            children: [
                                i18n.t("dashboard_view.banner_upgrade.upgrade_your_membership"),
                                " ",
                                nextMembership && membership_object[nextMembership]?.display
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/views/dashboard/components/Upgrade.tsx",
                            lineNumber: 62,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-blue-600 px-6 py-3 rounded-full cursor-pointer",
                            onClick: ()=>router.push("purchases/membership"),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: i18n.t("dashboard_view.banner_upgrade.upgrade")
                            }, void 0, false, {
                                fileName: "[project]/src/components/views/dashboard/components/Upgrade.tsx",
                                lineNumber: 75,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/views/dashboard/components/Upgrade.tsx",
                            lineNumber: 71,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/views/dashboard/components/Upgrade.tsx",
                    lineNumber: 61,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-black text-center",
                    children: "Ya cuentas con la membresia mas alta"
                }, void 0, false, {
                    fileName: "[project]/src/components/views/dashboard/components/Upgrade.tsx",
                    lineNumber: 79,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/views/dashboard/components/Upgrade.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/views/dashboard/components/Upgrade.tsx",
        lineNumber: 41,
        columnNumber: 5
    }, this);
};
_s(Upgrade, "lgVj6XKGzI7J+rkj0dUOotkJLwg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAxios$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = Upgrade;
const __TURBOPACK__default__export__ = Upgrade;
var _c;
__turbopack_refresh__.register(_c, "Upgrade");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/views/dashboard/components/PromoDubai.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAxios$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/hooks/useAxios.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next-auth/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/constants.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$card$2f$dist$2f$chunk$2d$5PILOUBS$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__card_default__as__Card$3e$__ = __turbopack_import__("[project]/node_modules/@heroui/card/dist/chunk-5PILOUBS.mjs [client] (ecmascript) <export card_default as Card>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$card$2f$dist$2f$chunk$2d$D5XJWRAV$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__card_header_default__as__CardHeader$3e$__ = __turbopack_import__("[project]/node_modules/@heroui/card/dist/chunk-D5XJWRAV.mjs [client] (ecmascript) <export card_header_default as CardHeader>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$image$2f$dist$2f$chunk$2d$MLPFQTYO$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__image_default__as__Image$3e$__ = __turbopack_import__("[project]/node_modules/@heroui/image/dist/chunk-MLPFQTYO.mjs [client] (ecmascript) <export image_default as Image>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$card$2f$dist$2f$chunk$2d$TE6SZS6W$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__card_footer_default__as__CardFooter$3e$__ = __turbopack_import__("[project]/node_modules/@heroui/card/dist/chunk-TE6SZS6W.mjs [client] (ecmascript) <export card_footer_default as CardFooter>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$progress$2f$dist$2f$chunk$2d$CXOJTH5M$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__progress_default__as__Progress$3e$__ = __turbopack_import__("[project]/node_modules/@heroui/progress/dist/chunk-CXOJTH5M.mjs [client] (ecmascript) <export progress_default as Progress>");
;
var _s = __turbopack_refresh__.signature();
;
;
;
;
const PromoDubai = ({ i18n })=>{
    _s();
    const { data } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useSession"])();
    const { data: rank } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAxios$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"])({
        url: "ranks/getUserRank",
        method: "post",
        postData: {
            id_user: data?.user?.id
        },
        defaultValue: {}
    }, [
        data?.user?.id
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$card$2f$dist$2f$chunk$2d$5PILOUBS$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__card_default__as__Card$3e$__["Card"], {
        isFooterBlurred: true,
        className: "w-full h-[300px]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$card$2f$dist$2f$chunk$2d$D5XJWRAV$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__card_header_default__as__CardHeader$3e$__["CardHeader"], {
                className: "absolute z-10 top-1 justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col items-start",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-tiny text-gray-900 uppercase font-bold",
                                children: i18n.t("dashboard_view.banner_promotional.promotional_bonus")
                            }, void 0, false, {
                                fileName: "[project]/src/components/views/dashboard/components/PromoDubai.tsx",
                                lineNumber: 31,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "text-gray-900 font-medium text-xl",
                                children: i18n.t("dashboard_view.banner_promotional.dubai_travel")
                            }, void 0, false, {
                                fileName: "[project]/src/components/views/dashboard/components/PromoDubai.tsx",
                                lineNumber: 34,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/views/dashboard/components/PromoDubai.tsx",
                        lineNumber: 30,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$image$2f$dist$2f$chunk$2d$MLPFQTYO$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__image_default__as__Image$3e$__["Image"], {
                        src: "/img/logo-dark.svg",
                        height: 30,
                        width: 100,
                        alt: "logo",
                        className: "rounded-none"
                    }, void 0, false, {
                        fileName: "[project]/src/components/views/dashboard/components/PromoDubai.tsx",
                        lineNumber: 38,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/views/dashboard/components/PromoDubai.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$image$2f$dist$2f$chunk$2d$MLPFQTYO$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__image_default__as__Image$3e$__["Image"], {
                removeWrapper: true,
                alt: "Relaxing app background",
                className: "z-0 w-full h-full object-cover object-center",
                src: "/img/dubai.webp"
            }, void 0, false, {
                fileName: "[project]/src/components/views/dashboard/components/PromoDubai.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$card$2f$dist$2f$chunk$2d$TE6SZS6W$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__card_footer_default__as__CardFooter$3e$__["CardFooter"], {
                className: "absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-grow gap-2 items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$image$2f$dist$2f$chunk$2d$MLPFQTYO$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__image_default__as__Image$3e$__["Image"], {
                                alt: "Breathing app icon",
                                className: "rounded-full w-10 h-10 bg-black",
                                src: "/img/ranks/2.png"
                            }, void 0, false, {
                                fileName: "[project]/src/components/views/dashboard/components/PromoDubai.tsx",
                                lineNumber: 54,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-tiny text-white/60",
                                        children: [
                                            i18n.t("dashboard_view.banner_promotional.requirement_rank"),
                                            ":"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/views/dashboard/components/PromoDubai.tsx",
                                        lineNumber: 60,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-tiny text-white/60",
                                        children: "DIRECTOR PREMIER (30K)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/views/dashboard/components/PromoDubai.tsx",
                                        lineNumber: 63,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/views/dashboard/components/PromoDubai.tsx",
                                lineNumber: 59,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/views/dashboard/components/PromoDubai.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, this),
                    rank && rank.points && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$progress$2f$dist$2f$chunk$2d$CXOJTH5M$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__progress_default__as__Progress$3e$__["Progress"], {
                        showValueLabel: true,
                        label: i18n.t("dashboard_view.banner_promotional.progress"),
                        className: "w-[200px]",
                        classNames: {
                            indicator: "bg-gradient-to-r from-primary to-secondary",
                            label: "tracking-wider font-medium text-default-600 text-[12px]",
                            value: "text-foreground/60 text-[12px]"
                        },
                        value: (rank?.points[rank?.points?.smaller] || 1) / (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["RanksObject"].director_premier.start_points + __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["RanksObject"].director_premier.points) * 100
                    }, void 0, false, {
                        fileName: "[project]/src/components/views/dashboard/components/PromoDubai.tsx",
                        lineNumber: 67,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/views/dashboard/components/PromoDubai.tsx",
                lineNumber: 52,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/views/dashboard/components/PromoDubai.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
};
_s(PromoDubai, "T7QRjpCiLbsLvBMMWOq6bB9MpGY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useSession"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAxios$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"]
    ];
});
_c = PromoDubai;
const __TURBOPACK__default__export__ = PromoDubai;
var _c;
__turbopack_refresh__.register(_c, "PromoDubai");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/views/dashboard/components/PromoRolex.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAxios$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/hooks/useAxios.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next-auth/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/constants.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$card$2f$dist$2f$chunk$2d$5PILOUBS$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__card_default__as__Card$3e$__ = __turbopack_import__("[project]/node_modules/@heroui/card/dist/chunk-5PILOUBS.mjs [client] (ecmascript) <export card_default as Card>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$card$2f$dist$2f$chunk$2d$D5XJWRAV$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__card_header_default__as__CardHeader$3e$__ = __turbopack_import__("[project]/node_modules/@heroui/card/dist/chunk-D5XJWRAV.mjs [client] (ecmascript) <export card_header_default as CardHeader>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$image$2f$dist$2f$chunk$2d$MLPFQTYO$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__image_default__as__Image$3e$__ = __turbopack_import__("[project]/node_modules/@heroui/image/dist/chunk-MLPFQTYO.mjs [client] (ecmascript) <export image_default as Image>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$card$2f$dist$2f$chunk$2d$TE6SZS6W$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__card_footer_default__as__CardFooter$3e$__ = __turbopack_import__("[project]/node_modules/@heroui/card/dist/chunk-TE6SZS6W.mjs [client] (ecmascript) <export card_footer_default as CardFooter>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$progress$2f$dist$2f$chunk$2d$CXOJTH5M$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__progress_default__as__Progress$3e$__ = __turbopack_import__("[project]/node_modules/@heroui/progress/dist/chunk-CXOJTH5M.mjs [client] (ecmascript) <export progress_default as Progress>");
;
var _s = __turbopack_refresh__.signature();
;
;
;
;
const PromoRolex = ({ i18n })=>{
    _s();
    const { data } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useSession"])();
    const { data: rank } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAxios$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"])({
        url: "ranks/getUserRank",
        method: "post",
        postData: {
            id_user: data?.user?.id
        },
        defaultValue: {}
    }, [
        data?.user?.id
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$card$2f$dist$2f$chunk$2d$5PILOUBS$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__card_default__as__Card$3e$__["Card"], {
        isFooterBlurred: true,
        className: "w-full h-[300px]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$card$2f$dist$2f$chunk$2d$D5XJWRAV$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__card_header_default__as__CardHeader$3e$__["CardHeader"], {
                className: "absolute z-10 top-1 justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col items-start",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-tiny text-gray-900 uppercase font-bold",
                                children: i18n.t("dashboard_view.banner_promotional.promotional_bonus")
                            }, void 0, false, {
                                fileName: "[project]/src/components/views/dashboard/components/PromoRolex.tsx",
                                lineNumber: 30,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "text-gray-900 font-medium text-xl",
                                children: "ROLEX"
                            }, void 0, false, {
                                fileName: "[project]/src/components/views/dashboard/components/PromoRolex.tsx",
                                lineNumber: 33,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/views/dashboard/components/PromoRolex.tsx",
                        lineNumber: 29,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$image$2f$dist$2f$chunk$2d$MLPFQTYO$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__image_default__as__Image$3e$__["Image"], {
                        src: "/img/logo-dark.svg",
                        height: 30,
                        width: 100,
                        alt: "logo",
                        className: "rounded-none"
                    }, void 0, false, {
                        fileName: "[project]/src/components/views/dashboard/components/PromoRolex.tsx",
                        lineNumber: 35,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/views/dashboard/components/PromoRolex.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$image$2f$dist$2f$chunk$2d$MLPFQTYO$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__image_default__as__Image$3e$__["Image"], {
                removeWrapper: true,
                alt: "Relaxing app background",
                className: "z-0 w-full h-full object-cover object-center",
                src: "/img/rolex.webp"
            }, void 0, false, {
                fileName: "[project]/src/components/views/dashboard/components/PromoRolex.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$card$2f$dist$2f$chunk$2d$TE6SZS6W$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__card_footer_default__as__CardFooter$3e$__["CardFooter"], {
                className: "absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-grow gap-2 items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$image$2f$dist$2f$chunk$2d$MLPFQTYO$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__image_default__as__Image$3e$__["Image"], {
                                alt: "Breathing app icon",
                                className: "rounded-full w-10 h-10 bg-black",
                                src: "/img/ranks/4.png"
                            }, void 0, false, {
                                fileName: "[project]/src/components/views/dashboard/components/PromoRolex.tsx",
                                lineNumber: 51,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-tiny text-white/60",
                                        children: [
                                            i18n.t("dashboard_view.banner_promotional.requirement_rank"),
                                            ":"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/views/dashboard/components/PromoRolex.tsx",
                                        lineNumber: 57,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-tiny text-white/60",
                                        children: "DIAMANTE (150K)"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/views/dashboard/components/PromoRolex.tsx",
                                        lineNumber: 60,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/views/dashboard/components/PromoRolex.tsx",
                                lineNumber: 56,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/views/dashboard/components/PromoRolex.tsx",
                        lineNumber: 50,
                        columnNumber: 9
                    }, this),
                    rank && rank.points && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$progress$2f$dist$2f$chunk$2d$CXOJTH5M$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__progress_default__as__Progress$3e$__["Progress"], {
                        showValueLabel: true,
                        label: i18n.t("dashboard_view.banner_promotional.progress"),
                        className: "w-[200px]",
                        classNames: {
                            indicator: "bg-gradient-to-r from-primary to-secondary",
                            label: "tracking-wider font-medium text-default-600 text-[12px]",
                            value: "text-foreground/60 text-[12px]"
                        },
                        value: (rank?.points[rank?.points?.smaller] || 1) / (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["RanksObject"].diamante.start_points + __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["RanksObject"].diamante.points) * 100
                    }, void 0, false, {
                        fileName: "[project]/src/components/views/dashboard/components/PromoRolex.tsx",
                        lineNumber: 64,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/views/dashboard/components/PromoRolex.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/views/dashboard/components/PromoRolex.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
};
_s(PromoRolex, "T7QRjpCiLbsLvBMMWOq6bB9MpGY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useSession"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAxios$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"]
    ];
});
_c = PromoRolex;
const __TURBOPACK__default__export__ = PromoRolex;
var _c;
__turbopack_refresh__.register(_c, "PromoRolex");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/views/dashboard/components/MultiplierPortafolio.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$utils$2f$cards$2f$Card$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/utils/cards/Card.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$utils$2f$formats$2f$formatNumbers$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/utils/formats/formatNumbers.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAxios$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/hooks/useAxios.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$progress$2f$dist$2f$chunk$2d$CXOJTH5M$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__progress_default__as__Progress$3e$__ = __turbopack_import__("[project]/node_modules/@heroui/progress/dist/chunk-CXOJTH5M.mjs [client] (ecmascript) <export progress_default as Progress>");
;
var _s = __turbopack_refresh__.signature();
;
;
;
;
const MultiplierPortafolio = ({ i18n })=>{
    _s();
    const { data } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAxios$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"])({
        url: "users/current-multiplier",
        method: "get",
        defaultValue: {}
    });
    const percent_deposit = data?.deposit?.current ? data.deposit.current / data.deposit.limit * 100 : 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$utils$2f$cards$2f$Card$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
        classNames: "flex flex-col gap-2 items-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-3xl font-bold text-dota",
                children: [
                    i18n.t('dashboard_view.multiplier_banner.multiplier'),
                    " (P)"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/views/dashboard/components/MultiplierPortafolio.tsx",
                lineNumber: 26,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[12px] ",
                children: [
                    i18n.t('dashboard_view.multiplier_banner.up_to'),
                    " 3x (",
                    i18n.t('dashboard_view.multiplier_banner.portfolio'),
                    ")"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/views/dashboard/components/MultiplierPortafolio.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[12px]",
                        children: "$"
                    }, void 0, false, {
                        fileName: "[project]/src/components/views/dashboard/components/MultiplierPortafolio.tsx",
                        lineNumber: 29,
                        columnNumber: 9
                    }, this),
                    " ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[28px] font-bold",
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$utils$2f$formats$2f$formatNumbers$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["formatNumberWithCommas"])(data?.deposit?.limit, 0)
                    }, void 0, false, {
                        fileName: "[project]/src/components/views/dashboard/components/MultiplierPortafolio.tsx",
                        lineNumber: 30,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[12px]",
                        children: "USD"
                    }, void 0, false, {
                        fileName: "[project]/src/components/views/dashboard/components/MultiplierPortafolio.tsx",
                        lineNumber: 33,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/views/dashboard/components/MultiplierPortafolio.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$progress$2f$dist$2f$chunk$2d$CXOJTH5M$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__progress_default__as__Progress$3e$__["Progress"], {
                value: percent_deposit
            }, void 0, false, {
                fileName: "[project]/src/components/views/dashboard/components/MultiplierPortafolio.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-lg",
                children: [
                    "$ ",
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$utils$2f$formats$2f$formatNumbers$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["formatNumberWithCommas"])(data?.deposit?.current, 0),
                    " USD / $",
                    " ",
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$utils$2f$formats$2f$formatNumbers$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["formatNumberWithCommas"])(data?.deposit?.limit, 0),
                    " USD"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/views/dashboard/components/MultiplierPortafolio.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/views/dashboard/components/MultiplierPortafolio.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, this);
};
_s(MultiplierPortafolio, "qwQ6z/vM5P3UHzS6ycD4vpVbqwM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAxios$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"]
    ];
});
_c = MultiplierPortafolio;
const __TURBOPACK__default__export__ = MultiplierPortafolio;
var _c;
__turbopack_refresh__.register(_c, "MultiplierPortafolio");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/views/dashboard/components/MultiplierMembership.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$utils$2f$cards$2f$Card$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/utils/cards/Card.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$utils$2f$formats$2f$formatNumbers$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/utils/formats/formatNumbers.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAxios$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/hooks/useAxios.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$progress$2f$dist$2f$chunk$2d$CXOJTH5M$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__progress_default__as__Progress$3e$__ = __turbopack_import__("[project]/node_modules/@heroui/progress/dist/chunk-CXOJTH5M.mjs [client] (ecmascript) <export progress_default as Progress>");
;
var _s = __turbopack_refresh__.signature();
;
;
;
;
const MultiplierMembership = ({ i18n })=>{
    _s();
    const { data } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAxios$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"])({
        url: "users/current-multiplier",
        method: "get",
        defaultValue: {}
    });
    const percent = data?.membership?.current ? data.membership.current / data.membership.limit * 100 : 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$utils$2f$cards$2f$Card$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
        classNames: "flex flex-col gap-2 items-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-3xl font-bold text-dota",
                children: [
                    i18n.t('dashboard_view.multiplier_banner.multiplier'),
                    " (M)"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/views/dashboard/components/MultiplierMembership.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[12px] ",
                children: [
                    i18n.t('dashboard_view.multiplier_banner.up_to'),
                    " 3x (",
                    i18n.t('dashboard_view.multiplier_banner.membership'),
                    ")"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/views/dashboard/components/MultiplierMembership.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[12px]",
                        children: "$"
                    }, void 0, false, {
                        fileName: "[project]/src/components/views/dashboard/components/MultiplierMembership.tsx",
                        lineNumber: 27,
                        columnNumber: 9
                    }, this),
                    " ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[28px] font-bold",
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$utils$2f$formats$2f$formatNumbers$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["formatNumberWithCommas"])(data?.membership?.limit, 0)
                    }, void 0, false, {
                        fileName: "[project]/src/components/views/dashboard/components/MultiplierMembership.tsx",
                        lineNumber: 28,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[12px]",
                        children: "USD"
                    }, void 0, false, {
                        fileName: "[project]/src/components/views/dashboard/components/MultiplierMembership.tsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/views/dashboard/components/MultiplierMembership.tsx",
                lineNumber: 26,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$progress$2f$dist$2f$chunk$2d$CXOJTH5M$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__progress_default__as__Progress$3e$__["Progress"], {
                value: percent
            }, void 0, false, {
                fileName: "[project]/src/components/views/dashboard/components/MultiplierMembership.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-lg",
                children: [
                    "$ ",
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$utils$2f$formats$2f$formatNumbers$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["formatNumberWithCommas"])(data?.membership?.current, 0),
                    " USD / $",
                    " ",
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$utils$2f$formats$2f$formatNumbers$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["formatNumberWithCommas"])(data?.membership?.limit, 0),
                    " USD"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/views/dashboard/components/MultiplierMembership.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/views/dashboard/components/MultiplierMembership.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, this);
};
_s(MultiplierMembership, "qwQ6z/vM5P3UHzS6ycD4vpVbqwM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAxios$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"]
    ];
});
_c = MultiplierMembership;
const __TURBOPACK__default__export__ = MultiplierMembership;
var _c;
__turbopack_refresh__.register(_c, "MultiplierMembership");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/views/dashboard/components/ActiveCompoundInterest.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
/* eslint-disable @next/next/no-img-element */ __turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$utils$2f$cards$2f$Card$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/utils/cards/Card.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/router.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAxios$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/hooks/useAxios.tsx [client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
;
;
;
const ActiveCompoundInterest = ({ i18n })=>{
    _s();
    const { data, loading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAxios$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"])({
        method: "get",
        url: "deposits/active-compound-interest",
        defaultValue: {
            is_active: false
        }
    });
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$utils$2f$cards$2f$Card$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
        classNames: " !border-white !p-0 flex items-center relative h-[200px]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                src: "/img/memberships/package-3.png",
                className: "w-full object-cover rounded-lg h-full object-top",
                alt: ""
            }, void 0, false, {
                fileName: "[project]/src/components/views/dashboard/components/ActiveCompoundInterest.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute left-10 text-white font-bold text-2xl top-10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: i18n.t("dashboard_view.compound_interest_banner.compound_interest")
                }, void 0, false, {
                    fileName: "[project]/src/components/views/dashboard/components/ActiveCompoundInterest.tsx",
                    lineNumber: 33,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/views/dashboard/components/ActiveCompoundInterest.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-0 p-4 flex items-center  backdrop-blur-lg w-full rounded-b-lg",
                children: !data?.is_active ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between w-full",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-white",
                            children: i18n.t("dashboard_view.compound_interest_banner.you_can_now")
                        }, void 0, false, {
                            fileName: "[project]/src/components/views/dashboard/components/ActiveCompoundInterest.tsx",
                            lineNumber: 40,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-yellow-500 text-black px-6 py-3 rounded-full cursor-pointer",
                            onClick: ()=>router.push("investment/list"),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: i18n.t("dashboard_view.compound_interest_banner.activate")
                            }, void 0, false, {
                                fileName: "[project]/src/components/views/dashboard/components/ActiveCompoundInterest.tsx",
                                lineNumber: 47,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/views/dashboard/components/ActiveCompoundInterest.tsx",
                            lineNumber: 43,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/views/dashboard/components/ActiveCompoundInterest.tsx",
                    lineNumber: 39,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-black text-center",
                    children: i18n.t("dashboard_view.compound_interest_banner.you_already_have")
                }, void 0, false, {
                    fileName: "[project]/src/components/views/dashboard/components/ActiveCompoundInterest.tsx",
                    lineNumber: 53,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/views/dashboard/components/ActiveCompoundInterest.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/views/dashboard/components/ActiveCompoundInterest.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
};
_s(ActiveCompoundInterest, "SR1b9R1gtLxDl1cHQNBoU/75fY0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAxios$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = ActiveCompoundInterest;
const __TURBOPACK__default__export__ = ActiveCompoundInterest;
var _c;
__turbopack_refresh__.register(_c, "ActiveCompoundInterest");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/views/dashboard/components/MapJson.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$echarts$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/echarts/index.js [client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/services/index.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$echarts$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/echarts/index.js [client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
"use client";
;
;
;
const MapJson = ()=>{
    _s();
    const chartRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MapJson.useEffect": ()=>{
            const fetchMapData = {
                "MapJson.useEffect.fetchMapData": async ()=>{
                    const response = await fetch("/world.json");
                    const worldJson = await response.json();
                    const countriesRes = await fetch("https://flagcdn.com/en/codes.json");
                    const countriesWithCode = await countriesRes.json();
                    const countriesResponse = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["default"].get("countries");
                    const countriesData = countriesResponse.data;
                    const data = Object.entries(countriesData).map({
                        "MapJson.useEffect.fetchMapData.data": ([code, value])=>({
                                name: countriesWithCode[code.toLowerCase()] || code,
                                value: value
                            })
                    }["MapJson.useEffect.fetchMapData.data"]);
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$echarts$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__.registerMap("USA", worldJson, {
                        Alaska: {
                            left: -131,
                            top: 25,
                            width: 15
                        },
                        Hawaii: {
                            left: -110,
                            top: 28,
                            width: 5
                        },
                        "Puerto Rico": {
                            left: -76,
                            top: 26,
                            width: 2
                        }
                    });
                    if (chartRef.current) {
                        const myChart = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$echarts$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__.init(chartRef.current);
                        const option = {
                            title: {
                                text: "",
                                subtext: "",
                                sublink: "",
                                left: "right"
                            },
                            tooltip: {
                                trigger: "item",
                                showDelay: 0,
                                transitionDuration: 0.2,
                                show: true
                            },
                            visualMap: {
                                left: "right",
                                min: 100,
                                max: 10000,
                                inRange: {
                                    color: [
                                        "#313695",
                                        "#4575b4",
                                        "#74add1",
                                        "#abd9e9",
                                        "#e0f3f8",
                                        "#ffffbf",
                                        "#fee090",
                                        "#fdae61",
                                        "#f46d43",
                                        "#d73027",
                                        "#a50026"
                                    ]
                                },
                                text: [
                                    "High",
                                    "Low"
                                ],
                                calculable: true
                            },
                            toolbox: {
                                show: false,
                                left: "left",
                                top: "top",
                                feature: {
                                    dataView: {
                                        readOnly: false
                                    },
                                    restore: {},
                                    saveAsImage: {}
                                }
                            },
                            series: [
                                {
                                    name: "Users by Countries",
                                    type: "map",
                                    roam: true,
                                    map: "USA",
                                    itemStyle: {
                                    },
                                    emphasis: {
                                        label: {
                                            show: true
                                        }
                                    },
                                    data: data
                                }
                            ]
                        };
                        myChart.setOption(option);
                        return ({
                            "MapJson.useEffect.fetchMapData": ()=>{
                                myChart.dispose();
                            }
                        })["MapJson.useEffect.fetchMapData"];
                    }
                }
            }["MapJson.useEffect.fetchMapData"];
            fetchMapData();
        }
    }["MapJson.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: chartRef,
        style: {
            width: "100%",
            height: "500px"
        }
    }, void 0, false, {
        fileName: "[project]/src/components/views/dashboard/components/MapJson.tsx",
        lineNumber: 108,
        columnNumber: 10
    }, this);
};
_s(MapJson, "X+1SfQQ6xefXNU27aQW843M7cTw=");
_c = MapJson;
const __TURBOPACK__default__export__ = MapJson;
var _c;
__turbopack_refresh__.register(_c, "MapJson");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/views/dashboard/components/CountriesList.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/services/index.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$card$2f$dist$2f$chunk$2d$5PILOUBS$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__card_default__as__Card$3e$__ = __turbopack_import__("[project]/node_modules/@heroui/card/dist/chunk-5PILOUBS.mjs [client] (ecmascript) <export card_default as Card>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$progress$2f$dist$2f$chunk$2d$CXOJTH5M$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__progress_default__as__Progress$3e$__ = __turbopack_import__("[project]/node_modules/@heroui/progress/dist/chunk-CXOJTH5M.mjs [client] (ecmascript) <export progress_default as Progress>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$spinner$2f$dist$2f$chunk$2d$MQ3ILONP$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__spinner_default__as__Spinner$3e$__ = __turbopack_import__("[project]/node_modules/@heroui/spinner/dist/chunk-MQ3ILONP.mjs [client] (ecmascript) <export spinner_default as Spinner>");
;
var _s = __turbopack_refresh__.signature();
;
;
;
const CountriesList = ()=>{
    _s();
    const [countries, setCountries] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const fetchCountries = async ()=>{
        const countriesRes = await fetch("https://flagcdn.com/en/codes.json");
        const countriesWithCode = await countriesRes.json();
        const countriesResponse = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["default"].get("countries");
        const countriesData = countriesResponse.data;
        const data = Object.entries(countriesData).map(([code, value])=>({
                name: countriesWithCode[code.toLowerCase()] || code,
                value: value
            }));
        setCountries(data);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CountriesList.useEffect": ()=>{
            fetchCountries();
        }
    }["CountriesList.useEffect"], []);
    const totalUsers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CountriesList.useMemo[totalUsers]": ()=>{
            return countries.reduce({
                "CountriesList.useMemo[totalUsers]": (acc, country)=>acc + country.value
            }["CountriesList.useMemo[totalUsers]"], 0);
        }
    }["CountriesList.useMemo[totalUsers]"], [
        countries
    ]);
    const sortedCountries = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CountriesList.useMemo[sortedCountries]": ()=>{
            return [
                ...countries
            ].sort({
                "CountriesList.useMemo[sortedCountries]": (a, b)=>b.value - a.value
            }["CountriesList.useMemo[sortedCountries]"]);
        }
    }["CountriesList.useMemo[sortedCountries]"], [
        countries
    ]);
    if (!countries) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$spinner$2f$dist$2f$chunk$2d$MQ3ILONP$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__spinner_default__as__Spinner$3e$__["Spinner"], {}, void 0, false, {
        fileName: "[project]/src/components/views/dashboard/components/CountriesList.tsx",
        lineNumber: 37,
        columnNumber: 29
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$card$2f$dist$2f$chunk$2d$5PILOUBS$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__card_default__as__Card$3e$__["Card"], {
        className: "p-4 flex flex-col gap-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-xl",
                children: "Países"
            }, void 0, false, {
                fileName: "[project]/src/components/views/dashboard/components/CountriesList.tsx",
                lineNumber: 40,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 w-full gap-x-4 items-center",
                children: sortedCountries.slice(0, 10).map((country, index)=>{
                    const percent = Number(country.value) / totalUsers * 100;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-[min-content_1fr_min-content_min-content] w-full gap-1 items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "truncate w-20",
                                children: country?.name
                            }, void 0, false, {
                                fileName: "[project]/src/components/views/dashboard/components/CountriesList.tsx",
                                lineNumber: 46,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-[200px]",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$progress$2f$dist$2f$chunk$2d$CXOJTH5M$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__progress_default__as__Progress$3e$__["Progress"], {
                                    className: "w-full",
                                    value: percent
                                }, void 0, false, {
                                    fileName: "[project]/src/components/views/dashboard/components/CountriesList.tsx",
                                    lineNumber: 48,
                                    columnNumber: 33
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/views/dashboard/components/CountriesList.tsx",
                                lineNumber: 47,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: country.value
                            }, void 0, false, {
                                fileName: "[project]/src/components/views/dashboard/components/CountriesList.tsx",
                                lineNumber: 50,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "whitespace-nowrap w-16 truncate",
                                children: [
                                    "(",
                                    percent.toFixed(2),
                                    ")%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/views/dashboard/components/CountriesList.tsx",
                                lineNumber: 51,
                                columnNumber: 29
                            }, this)
                        ]
                    }, index, true, {
                        fileName: "[project]/src/components/views/dashboard/components/CountriesList.tsx",
                        lineNumber: 45,
                        columnNumber: 25
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/views/dashboard/components/CountriesList.tsx",
                lineNumber: 41,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/views/dashboard/components/CountriesList.tsx",
        lineNumber: 39,
        columnNumber: 9
    }, this);
};
_s(CountriesList, "E0ok4BEzxSYesAU1WzC0feA2DT8=");
_c = CountriesList;
const __TURBOPACK__default__export__ = CountriesList;
var _c;
__turbopack_refresh__.register(_c, "CountriesList");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/views/dashboard/Dashboard.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$utils$2f$cards$2f$Card$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/utils/cards/Card.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$utils$2f$cards$2f$CardBanner$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/utils/cards/CardBanner.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$utils$2f$cards$2f$ButtonDota$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/utils/cards/ButtonDota.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$views$2f$dashboard$2f$components$2f$Links$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/views/dashboard/components/Links.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$views$2f$dashboard$2f$components$2f$RanksDashboard$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/views/dashboard/components/RanksDashboard.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$views$2f$dashboard$2f$components$2f$NextRank$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/views/dashboard/components/NextRank.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$views$2f$dashboard$2f$components$2f$InvestmentCard$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/views/dashboard/components/InvestmentCard.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$views$2f$dashboard$2f$components$2f$Upgrade$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/views/dashboard/components/Upgrade.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$views$2f$dashboard$2f$components$2f$PromoDubai$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/views/dashboard/components/PromoDubai.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$views$2f$dashboard$2f$components$2f$PromoRolex$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/views/dashboard/components/PromoRolex.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$views$2f$dashboard$2f$components$2f$MultiplierPortafolio$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/views/dashboard/components/MultiplierPortafolio.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$views$2f$dashboard$2f$components$2f$MultiplierMembership$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/views/dashboard/components/MultiplierMembership.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$views$2f$dashboard$2f$components$2f$ActiveCompoundInterest$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/views/dashboard/components/ActiveCompoundInterest.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/react-i18next/dist/es/index.js [client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$views$2f$dashboard$2f$components$2f$MapJson$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/views/dashboard/components/MapJson.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$views$2f$dashboard$2f$components$2f$CountriesList$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/views/dashboard/components/CountriesList.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react-i18next/dist/es/useTranslation.js [client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const Dashboard = ()=>{
    _s();
    const i18n = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useTranslation"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex justify-center w-full",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-1 md:grid-cols-2 gap-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$utils$2f$cards$2f$CardBanner$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                    img: "/img/buy-membership.png",
                    position: "bottom",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-gray-900/70 flex flex-col gap-2 p-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-3xl font-bold",
                                children: i18n.t("dashboard_view.banner_membership.title")
                            }, void 0, false, {
                                fileName: "[project]/src/components/views/dashboard/Dashboard.tsx",
                                lineNumber: 26,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xl font-black text-balance",
                                children: i18n.t("dashboard_view.banner_membership.description")
                            }, void 0, false, {
                                fileName: "[project]/src/components/views/dashboard/Dashboard.tsx",
                                lineNumber: 29,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/views/dashboard/Dashboard.tsx",
                        lineNumber: 25,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/views/dashboard/Dashboard.tsx",
                    lineNumber: 24,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$utils$2f$cards$2f$CardBanner$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                    img: "/img/buy-nft.png",
                    position: "top",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-3xl font-bold",
                        children: i18n.t("dashboard_view.banner_nft")
                    }, void 0, false, {
                        fileName: "[project]/src/components/views/dashboard/Dashboard.tsx",
                        lineNumber: 36,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/views/dashboard/Dashboard.tsx",
                    lineNumber: 35,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$views$2f$dashboard$2f$components$2f$PromoDubai$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                    i18n: i18n
                }, void 0, false, {
                    fileName: "[project]/src/components/views/dashboard/Dashboard.tsx",
                    lineNumber: 41,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$views$2f$dashboard$2f$components$2f$PromoRolex$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                    i18n: i18n
                }, void 0, false, {
                    fileName: "[project]/src/components/views/dashboard/Dashboard.tsx",
                    lineNumber: 43,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$utils$2f$cards$2f$Card$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                    classNames: "col-span-full",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xl font-bold",
                                children: i18n.t("dashboard_view.join_to_our_channel")
                            }, void 0, false, {
                                fileName: "[project]/src/components/views/dashboard/Dashboard.tsx",
                                lineNumber: 47,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$utils$2f$cards$2f$ButtonDota$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                rounded: "md",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[14px] font-bold uppercase",
                                    children: i18n.t("dashboard_view.join_to_our_channel")
                                }, void 0, false, {
                                    fileName: "[project]/src/components/views/dashboard/Dashboard.tsx",
                                    lineNumber: 51,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/views/dashboard/Dashboard.tsx",
                                lineNumber: 50,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/views/dashboard/Dashboard.tsx",
                        lineNumber: 46,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/views/dashboard/Dashboard.tsx",
                    lineNumber: 45,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$views$2f$dashboard$2f$components$2f$Upgrade$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                    i18n: i18n
                }, void 0, false, {
                    fileName: "[project]/src/components/views/dashboard/Dashboard.tsx",
                    lineNumber: 58,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$views$2f$dashboard$2f$components$2f$Links$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                    i18n: i18n
                }, void 0, false, {
                    fileName: "[project]/src/components/views/dashboard/Dashboard.tsx",
                    lineNumber: 60,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$views$2f$dashboard$2f$components$2f$InvestmentCard$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                    i18n: i18n
                }, void 0, false, {
                    fileName: "[project]/src/components/views/dashboard/Dashboard.tsx",
                    lineNumber: 62,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$views$2f$dashboard$2f$components$2f$ActiveCompoundInterest$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                    i18n: i18n
                }, void 0, false, {
                    fileName: "[project]/src/components/views/dashboard/Dashboard.tsx",
                    lineNumber: 64,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$views$2f$dashboard$2f$components$2f$MultiplierPortafolio$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                    i18n: i18n
                }, void 0, false, {
                    fileName: "[project]/src/components/views/dashboard/Dashboard.tsx",
                    lineNumber: 66,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$views$2f$dashboard$2f$components$2f$MultiplierMembership$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                    i18n: i18n
                }, void 0, false, {
                    fileName: "[project]/src/components/views/dashboard/Dashboard.tsx",
                    lineNumber: 68,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$views$2f$dashboard$2f$components$2f$RanksDashboard$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                    i18n: i18n
                }, void 0, false, {
                    fileName: "[project]/src/components/views/dashboard/Dashboard.tsx",
                    lineNumber: 71,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$views$2f$dashboard$2f$components$2f$NextRank$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                    i18n: i18n
                }, void 0, false, {
                    fileName: "[project]/src/components/views/dashboard/Dashboard.tsx",
                    lineNumber: 74,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$utils$2f$cards$2f$Card$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                    classNames: "col-span-full grid grid-cols-12 gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "col-span-full md:col-span-6 lg:col-span-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$views$2f$dashboard$2f$components$2f$CountriesList$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                fileName: "[project]/src/components/views/dashboard/Dashboard.tsx",
                                lineNumber: 77,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/views/dashboard/Dashboard.tsx",
                            lineNumber: 76,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "col-span-full md:col-span-6 lg:col-span-8",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$views$2f$dashboard$2f$components$2f$MapJson$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                fileName: "[project]/src/components/views/dashboard/Dashboard.tsx",
                                lineNumber: 80,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/views/dashboard/Dashboard.tsx",
                            lineNumber: 79,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/views/dashboard/Dashboard.tsx",
                    lineNumber: 75,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/views/dashboard/Dashboard.tsx",
            lineNumber: 23,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/views/dashboard/Dashboard.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
};
_s(Dashboard, "MZh2xlb+yyJQ+ixme569j2yuOX0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$useTranslation$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useTranslation"]
    ];
});
_c = Dashboard;
const __TURBOPACK__default__export__ = Dashboard;
var _c;
__turbopack_refresh__.register(_c, "Dashboard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/pages/index.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>Home)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$layouts$2f$main$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/layouts/main.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$views$2f$trading$2f$TradingView$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/views/trading/TradingView.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$views$2f$dashboard$2f$Dashboard$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/views/dashboard/Dashboard.tsx [client] (ecmascript)");
"use client";
;
;
;
;
function Home() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$layouts$2f$main$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "flex flex-col gap-8 items-center sm:items-start",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$views$2f$trading$2f$TradingView$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/src/pages/index.tsx",
                    lineNumber: 10,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$views$2f$dashboard$2f$Dashboard$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/src/pages/index.tsx",
                    lineNumber: 11,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/pages/index.tsx",
            lineNumber: 9,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/pages/index.tsx",
        lineNumber: 8,
        columnNumber: 5
    }, this);
}
_c = Home;
var _c;
__turbopack_refresh__.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/src/pages/index.tsx [client] (ecmascript)\" } [client] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
const PAGE_PATH = "/";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_require__("[project]/src/pages/index.tsx [client] (ecmascript)");
    }
]);
// @ts-expect-error module.hot exists
if (module.hot) {
    // @ts-expect-error module.hot exists
    module.hot.dispose(function() {
        window.__NEXT_P.push([
            PAGE_PATH
        ]);
    });
}
}}),
"[project]/src/pages/index (hmr-entry)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, m: module, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_require__("[next]/entry/page-loader.ts { PAGE => \"[project]/src/pages/index.tsx [client] (ecmascript)\" } [client] (ecmascript)");
}}),
}]);

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__c658b5._.js.map