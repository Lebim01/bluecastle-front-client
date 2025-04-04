(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/[root of the server]__a764e4._.js", {

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
"[next]/internal/font/google/poppins_53cb8bd0.module.css [client] (css module)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_export_value__({
  "className": "poppins_53cb8bd0-module__XtDkGq__className",
});
}}),
"[next]/internal/font/google/poppins_53cb8bd0.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$poppins_53cb8bd0$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__ = __turbopack_import__("[next]/internal/font/google/poppins_53cb8bd0.module.css [client] (css module)");
;
const fontData = {
    className: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$poppins_53cb8bd0$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].className,
    style: {
        fontFamily: "'Poppins', 'Poppins Fallback'",
        fontStyle: "normal"
    }
};
if (__TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$poppins_53cb8bd0$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].variable != null) {
    fontData.variable = __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$poppins_53cb8bd0$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].variable;
}
const __TURBOPACK__default__export__ = fontData;
}}),
"[project]/src/utils/translations/en.json (json)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_export_value__(JSON.parse("{\"login\":\"Login\",\"logout\":\"Logout\",\"forgot_password\":\"Forgot password?\",\"errors_invalid_credentials\":\"Incorrect username and/or password\",\"errors_confirm_email\":\"Email does not match\",\"errors_confirm_password\":\"Password does not match\",\"errors_network\":\"Something went wrong, try later\",\"errors_user_exists\":\"User already exists\",\"logged_as\":\"Logged as:\",\"menu\":{\"dashboard\":\"Dashboard\",\"my_team\":\"My team\",\"unilevel\":\"Unilevel\",\"binary\":\"Binary\",\"academy\":\"Academy\",\"live_sessions\":\"Live Sessions\",\"past_sessions\":\"Past Sessions\",\"investments\":\"Portfolio\",\"invest\":\"Add value\",\"my_investments\":\"My Portafolio\",\"buys\":\"Memberships\",\"buy_membership\":\"Buy a Membership\",\"my_buys\":\"My Purchases\",\"help\":\"Help\",\"withdrawals\":\"Withdrawals\",\"signals\":\"Signals\",\"tools\":\"Tools\",\"profile\":\"Profile\",\"exit\":\"Exit\",\"ranks\":\"Ranks\"},\"dashboard_view\":{\"banner_membership\":{\"title\":\"You have your membership\",\"description\":\"You already have your membership! You can go to your academy to browse the courses!\"},\"banner_nft\":{\"title\":\"You have an NFT\",\"get_button\":\"Reclaim\",\"connnect_button\":\"Connect wallet\",\"need_install_metamask\":\"You need install metamask\",\"need_connect\":\"Connect to your wallet first\",\"wallet_denied\":\"Wallet denied\",\"success_get\":\"Successfully obtained\"},\"banner_promotional\":{\"promotional_bonus\":\"PROMOTIONAL BONUS\",\"dubai_travel\":\"DUBAI TRAVEL\",\"requirement_rank\":\"Requirement Rank\",\"progress\":\"Progress\"},\"binance_bot\":{\"get_bot\":\"Get your bot\",\"get_button\":\"Connect bot\"},\"join_to_our_channel\":\"Join to our channel\",\"banner_upgrade\":{\"membership\":\"Membership\",\"upgrade_your_membership\":\"Upgrade your membership to\",\"upgrade\":\"Upgrade\"},\"banner_referral\":{\"referral_link\":\"Referral link\",\"left\":\"LEFT\",\"right\":\"RIGHT\",\"choose_the_placement\":\"Choose the placement\",\"we_will\":\"We will place the guest who registers on your\",\"side\":\"side\",\"copy\":\"COPY\"},\"portfolio_banner\":{\"portfolio\":\"Portfolio\",\"add_value_up_to\":\"Add value up to\"},\"compound_interest_banner\":{\"compound_interest\":\"Compound Interest\",\"you_can_now\":\"You can now activate compound.\",\"activate\":\"Activate\",\"you_already_have\":\"You already have compound actived.\"},\"multiplier_banner\":{\"multiplier\":\"Multiplier\",\"up_to\":\"Up to\",\"portfolio\":\"Portfolio\",\"membership\":\"Membership\"},\"rank_banner\":{\"current_rank\":\"Current Rank\",\"classified\":\"CLASSIFIED\",\"rank\":\"RANK\",\"left_points\":\"Left Points\",\"right_points\":\"Right Points\",\"shorter_leg\":\"Shorter Leg\",\"next_rank\":\"Next Rank\"}},\"invest_view\":{\"amount\":\"Amount\",\"amount_deposit\":\"Amount to deposit\",\"generate_qr\":\"Generate QR\",\"min_amount\":\"Min amount is 100 USD\",\"accept_terms\":\"You should accept the terms and conditions\"},\"commissions\":{\"commissions\":\"Commissions\",\"ewallet\":\"Ewallet\"},\"cancel\":\"Cancel\",\"accept_terms\":\"I agree to the terms and conditions\",\"my_team\":{\"me\":{\"direct\":\"Direct\",\"name\":\"Name\",\"email\":\"Email\"},\"binary\":{\"left\":\"Left\",\"right\":\"Right\",\"pack\":\"Pack\",\"home\":\"Home\"}},\"portfolio_view\":{\"add_value\":{\"adding_value_generates_up_to\":\"Adding value generates up to 8% points monthly.\",\"you_can_add_value\":\"You can add value up to 10x the value of your membership.\",\"current\":\"Current\",\"remaining\":\"Remaining\"},\"my_portfolio\":{\"deposits\":\"Deposits\",\"generated_returns\":\"Generated Returns\",\"available_returns\":\"Available Returns\",\"activating_compound\":\"Activate compound interest, it pays you 7.6% compound interest each month\",\"your_compound_interest\":\"Your compound interest is already active!\",\"deposit_history\":\"Deposit History\",\"deposit_date\":\"Deposit date\",\"deposited_amount\":\"Deposited amount\",\"next_return\":\"Next return\",\"generated\":\"Generated\",\"withdrawn\":\"Withdrawn\",\"availables\":\"Availables\",\"details\":\"Details\"}},\"purchases\":{\"membership\":{\"basic\":\"Basic\",\"medium\":\"Medium\",\"advanced\":\"Advanced\",\"pro\":\"Pro\",\"benefits\":{\"crypto_course\":\"Crypto Course\",\"tokenomic_course\":\"Tokenomics Course\",\"binance_trading_bot\":\"Binance Trading Bot\",\"trading_signals\":\"Trading Signals\",\"live_classes\":\"Live Classes\",\"generates_up_to_3\":\"Generates up to 3x points\",\"adds_value_up_to_10\":\"Adds value up to 10x your membership\"},\"availability\":\"Already have this membership\",\"not_available\":\"Not Available\"},\"my_memberships\":{\"purchases\":\"Purchases\",\"item\":\"Item\",\"date\":\"Date\",\"status\":\"Status\",\"payment_method\":\"Payment Method\"}},\"comissions_view\":{\"direct\":\"Direct\",\"binary\":\"Binary\",\"reward\":\"Reward\",\"rank\":\"Rank\",\"amount\":\"Amount\",\"description\":\"Description\",\"date\":\"Date\"},\"witdhdrawals_view\":{\"available_balance\":\"Available balance\",\"pending_balance\":\"Pending to approve\",\"status\":\"Status\",\"amount_to_withdraw\":\"Amount to withdraw\",\"withdraw\":\"Withdraw\",\"withdrawal_history\":\"Withdrawal history\",\"amount\":\"Amount\",\"date\":\"Date\",\"tabs\":{\"direct\":\"Direct withdrawal\",\"ranks\":\"Rank withdrawal\",\"binary\":\"Binary withdrawal\",\"deposits\":\"Investment withdrawal\"}},\"last_signals\":\"Last signals\",\"looks_like\":\"Looks like you don't have signals yet\",\"profile_view\":{\"profile\":\"Profile\",\"password\":\"Password\",\"wallet\":\"Wallet\",\"personal_data\":\"Personal data\",\"name\":\"Name\",\"email\":\"Email\",\"social_networks\":\"Social Networks\",\"address\":\"Address\",\"country\":\"Country\",\"state\":\"State\",\"city\":\"City\",\"save\":\"Save\",\"actual_password\":\"Current password\",\"new_password\":\"New password\",\"confirm_new_password\":\"Confirm new password\",\"verification_code\":\"Verification code\",\"confirm_code\":\"Confirm code\",\"update_password\":\"Update Password\",\"wallet_address\":\"Wallet Address\",\"request_verification_code\":\"Request Verification Code\",\"save_information\":\"Save Information\",\"loading\":\"Loading\"},\"errors\":{\"name_is_required\":\"Name is required\",\"whatsapp_number_required\":\"The WhatsApp number is required\",\"country_required\":\"The country is required\",\"state_required\":\"The state is required\",\"city_required\":\"The city is required\",\"profile_updated_successfully\":\"Profile updated successfully\",\"profile_update_failed\":\"Failed to update profile\",\"current_password_required\":\"The current password is required\",\"new_password_required\":\"The new password is required\",\"password_min_length\":\"The password must be at least 8 characters long\",\"passwords_do_not_match\":\"Passwords do not match\",\"incorrect_verification_code\":\"The verification code is incorrect\",\"wallet_address_required\":\"The wallet address is required\"},\"rank_view\":{\"menu_rank\":\"Ranks\",\"your_actual_score\":\"Your actual score\",\"ranks\":{\"emprendedor\":\"Entrepreneur\",\"constructor\":\"Builder\",\"director\":\"Director\",\"director_premier\":\"Premier Director\",\"embajador\":\"Ambassador\",\"diamond\":\"Diamond\",\"ejecutive_diamond\":\"Executive Diamond\",\"premier_diamond\":\"Premier Diamond\",\"black_diamond\":\"Black Diamond\",\"crown_diamond\":\"Crown Diamond\",\"royal_diamond\":\"Royal Diamond\"}},\"landing\":{\"sections\":{\"discover_your_potential\":\"Discover your potential\",\"join_dota\":\"Join DOTA\",\"login_to_my_account\":\"Login to my account\",\"dota_crypto_academy\":\"DOTA Crypto Academy\",\"our_packages\":\"Our packages\",\"learn_more_about_our_academy\":\"Learn more about our Academy at DOTA\",\"get\":\"Get\",\"menu\":{\"home\":\"Home\",\"products\":\"Products\",\"about_us\":\"About us\",\"sign_up\":\"Sign up\"}},\"about_us\":{\"title\":\"Learn more about our Academy at DOTA\",\"welcome\":\"Welcome to DOTA, your trusted academy for learning cryptocurrency trading, from the basics to mastery.\",\"experience\":\"At DOTA, we take pride in offering an exceptional educational experience designed specifically for those passionate about the exciting world of cryptocurrencies and trading.\",\"guidance\":\"At DOTA, we understand that the cryptocurrency universe can seem intimidating to many. That is why we have assembled a team of trading and cryptocurrency experts who are here to guide you every step of the way, regardless of your prior experience. Our instructors not only have deep market knowledge but also a passion for sharing their expertise and helping you achieve your financial goals.\",\"courses\":\"Our courses are carefully designed to cover all aspects of cryptocurrency trading, from fundamental basics to the most advanced strategies. Whether you are taking your first steps into trading or looking to refine your existing skills, at DOTA you will find courses tailored to your needs and goals.\",\"highlight\":\"What makes us stand out? At DOTA, we not only strive to offer high-quality content, but we also aim to create a vibrant and supportive community. Our students have access to discussion forums, live Q&A sessions, and exclusive events where they can connect with other trading enthusiasts and share ideas and strategies.\",\"evolution\":\"Furthermore, we understand that the cryptocurrency market is constantly evolving. That is why we are committed to keeping our courses updated with the latest trends and market developments, so you can make informed decisions and stay ahead.\",\"goal\":\"At DOTA, our goal is to provide you with the tools and knowledge necessary to become a successful and confident trader in the exciting world of cryptocurrencies. Join us today and start your journey towards financial success with DOTA.\",\"community\":\"Welcome to the DOTA community, where learning and success go hand in hand!\"}},\"faq\":{\"open_tickets\":\"Open tickets\",\"open_new_ticket\":\"Open new ticket\",\"title\":\"Title\",\"issue_title\":\"Issue title\",\"description\":\"Description\",\"issue_description\":\"Issue description\",\"change_email\":\"How can I change my email?\",\"missing_commission\":\"Why hasn't my commission arrived?\",\"change_info\":\"How can I change my information?\",\"wrong_commission_amount\":\"My commission amount is higher or lower (it's incorrect)\",\"purchase_not_approved\":\"My purchase is not approved, but I already made the payment\",\"purchase_deleted\":\"Purchase deleted by mistake\",\"unrecognized_charge\":\"An unrecognized charge was made\"},\"countries\":\"Countries\",\"sign_up\":{\"signup_title\":\"Sign up. It's easy and fast\",\"referred_by\":\"Referred by\",\"full_name\":\"Full Name\",\"username\":\"Username\",\"email\":\"Email\",\"confirm_email\":\"Confirm Email\",\"password\":\"Password\",\"confirm_password\":\"Confirm your password\",\"country\":\"Country\",\"code\":\"Code\",\"phone\":\"Phone\",\"accept_terms\":\"I accept the\",\"terms\":\"Terms\",\"privacy_policy\":\"Privacy Policy\",\"register\":\"Sign up\",\"username_no_spaces\":\"Username cannot contain spaces\",\"select_country\":\"Select a country from the list\",\"and\":\"&\",\"user_registered_success\":\"User successfully registered\"}}"));}}),
"[project]/src/utils/translations/es.json (json)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_export_value__(JSON.parse("{\"login\":\"Iniciar Sesión\",\"logout\":\"Cerrar Sesión\",\"forgot_password\":\"¿Olvidaste tu contraseña?\",\"errors_invalid_credentials\":\"Usuario y/o contraseña incorrectos\",\"errors_confirm_email\":\"Email no coinciden\",\"errors_confirm_password\":\"Contraseña no coinciden\",\"errors_network\":\"Algo salió mal, intenta más tarde\",\"errors_user_exists\":\"Usuario ya existe\",\"logged_as\":\"Iniciaste como:\",\"menu\":{\"dashboard\":\"Dashboard\",\"my_team\":\"Mi equipo\",\"unilevel\":\"Unilevel\",\"binary\":\"Binario\",\"academy\":\"Academia\",\"live_sessions\":\"Sesiones en vivo\",\"past_sessions\":\"Sesiones Grabadas\",\"investments\":\"Portafolio\",\"invest\":\"Agregar valor\",\"my_investments\":\"Mis depositos\",\"buys\":\"Membresias\",\"buy_membership\":\"Comprar Membresia\",\"my_buys\":\"Mis Compras\",\"help\":\"Ayuda\",\"withdrawals\":\"Retiros\",\"signals\":\"Señales\",\"tools\":\"Herramientas\",\"profile\":\"Perfil\",\"exit\":\"Salir\",\"ranks\":\"Rangos\"},\"dashboard_view\":{\"banner_membership\":{\"title\":\"Tienes tu membresía\",\"description\":\"¡Ya tienes tu membresía! Puedes ir a tu academia para explorar los cursos.\"},\"banner_nft\":{\"title\":\"Tienes un NFT\",\"get_button\":\"Reclamar\",\"connnect_button\":\"Conectar wallet\",\"need_install_metamask\":\"Necesitas instalar metamask\",\"need_connect\":\"Conéctate a tu wallet primero\",\"wallet_denied\":\"Billetera denegada\",\"success_get\":\"Obtenido con éxito\"},\"banner_promotional\":{\"promotional_bonus\":\"BONO PROMOCIONAL\",\"dubai_travel\":\"VIAJE A DUBÁI\",\"requirement_rank\":\"Requisito de rango\",\"progress\":\"Progreso\"},\"binance_bot\":{\"get_bot\":\"Obtén tu bot\",\"get_button\":\"Conectar bot\"},\"join_to_our_channel\":\"Únete a nuestro canal\",\"banner_upgrade\":{\"membership\":\"Membresía\",\"upgrade_your_membership\":\"Actualiza tu membresía a\",\"upgrade\":\"Actualizar\"},\"banner_referral\":{\"referral_link\":\"Enlace de referidos\",\"left\":\"IZQUIERDA\",\"right\":\"DERECHA\",\"choose_the_placement\":\"Elige la colocación\",\"we_will\":\"Colocaremos al invitado que se registre en tu\",\"side\":\"lado\",\"copy\":\"COPIAR\"},\"portfolio_banner\":{\"portfolio\":\"Portafolio\",\"add_value_up_to\":\"Agrega valor hasta\"},\"compound_interest_banner\":{\"compound_interest\":\"Interés compuesto\",\"you_can_now\":\"Ya puedes activar compuesto.\",\"activate\":\"Activar\",\"you_already_have\":\"Ya tienes compuesto activado.\"},\"multiplier_banner\":{\"multiplier\":\"Multiplicador\",\"up_to\":\"Hasta\",\"portfolio\":\"Portafolio\",\"membership\":\"Membresía\"},\"rank_banner\":{\"actual_rank\":\"Rango actual\",\"classified\":\"CLASIFICADO\",\"rank\":\"RANGO\",\"left_points\":\"Puntos lado izq\",\"right_points\":\"Puntos lado der\",\"shorter_leg\":\"Pierna más corta\",\"next_rank\":\"Siguiente rango\"}},\"invest_view\":{\"amount\":\"Cantidad\",\"amount_deposit\":\"Cantidad a depositar\",\"generate_qr\":\"Generar QR\",\"min_amount\":\"La cantidad minima es 100 USD\",\"accept_terms\":\"Debes aceptar los terminos y condiciones\"},\"commissions\":{\"commissions\":\"Comisiones\",\"ewallet\":\"Ewallet\"},\"cancel\":\"Cancelar\",\"accept_terms\":\"Estoy de acuerdo con los terminos y condiciones\",\"my_team\":{\"me\":{\"direct\":\"Directo\",\"name\":\"Nombre\",\"email\":\"Correo electrónico\"},\"binary\":{\"left\":\"Izq\",\"right\":\"Der\",\"pack\":\"Paquete\",\"home\":\"Inicio\"}},\"portfolio_view\":{\"add_value\":{\"adding_value_generates_up_to\":\"Agregar valor genera hasta el 8% de puntos mensualmente.\",\"you_can_add_value\":\"Puedes agregar valor hasta 10x el valor de tu membresía.\",\"current\":\"Actual\",\"remaining\":\"Restante\"},\"my_portfolio\":{\"deposits\":\"Depósitos\",\"generated_returns\":\"Rendimientos generados\",\"available_returns\":\"Rendimientos disponibles\",\"activating_compound\":\"Activar el interés compuesto, te paga 7.6% de interes compuesto cada mes\",\"your_compound_interest\":\"¡Ya tienes activo tu interés compuesto!\",\"deposit_history\":\"Historial de depósitos\",\"deposit_date\":\"Fecha de depósito\",\"deposited_amount\":\"Cantidad depositada\",\"next_return\":\"Siguiente rendimiento\",\"generated\":\"Generado\",\"withdrawn\":\"Retirados\",\"availables\":\"Disponibles\",\"details\":\"Detalles\"}},\"purchases\":{\"membership\":{\"basic\":\"Básico\",\"medium\":\"Medio\",\"advanced\":\"Avanzado\",\"pro\":\"Pro\",\"benefits\":{\"crypto_course\":\"Curso Crypto\",\"tokenomic_course\":\"Curso Tokenomics\",\"binance_trading_bot\":\"Bot de Trading Binance\",\"trading_signals\":\"Señales de Trading\",\"live_classes\":\"Clases en Vivo\",\"generates_up_to_3\":\"Genera hasta 3x puntos\",\"adds_value_up_to_10\":\"Agrega valor hasta 10x de tu membresía\"},\"availability\":\"Ya cuentas con esta membresía\",\"not_available\":\"No disponible\"},\"my_memberships\":{\"purchases\":\"Membresias\",\"item\":\"Articulo\",\"date\":\"Fecha\",\"status\":\"Estatus\",\"payment_method\":\"Metodo de Pago\"}},\"comissions_view\":{\"direct\":\"Directo\",\"binary\":\"Binario\",\"reward\":\"Recompensa\",\"rank\":\"Rango\",\"amount\":\"Monto\",\"description\":\"Descripción\",\"date\":\"Fecha\"},\"witdhdrawals_view\":{\"available_balance\":\"Saldo disponible\",\"amount_to_withdraw\":\"Cantidad a retirar\",\"pending_balance\":\"Pendiente\",\"status\":\"Estatus\",\"withdraw\":\"Retirar\",\"withdrawal_history\":\"Historial de retiros\",\"amount\":\"Monto\",\"date\":\"Fecha\",\"tabs\":{\"direct\":\"Retiro directo\",\"ranks\":\"Retiro de rango\",\"binary\":\"Retiro de binario\",\"deposits\":\"Retiro de inversiones\"}},\"last_signals\":\"Últimas señales\",\"looks_like\":\"Parece que todavía no tienes señales\",\"profile_view\":{\"profile\":\"Perfil\",\"password\":\"Contraseña\",\"wallet\":\"Billetera\",\"personal_data\":\"Datos personales\",\"name\":\"Nombre\",\"email\":\"Correo electrónico\",\"social_networks\":\"Redes sociales\",\"address\":\"Dirección\",\"country\":\"País\",\"state\":\"Estado\",\"city\":\"Ciudad\",\"save\":\"Guardar\",\"actual_password\":\"Contraseña actual\",\"new_password\":\"Nueva contraseña\",\"confirm_new_password\":\"Confirmar nueva contraseña\",\"verification_code\":\"Código de verificación\",\"confirm_code\":\"Verificar Código\",\"update_password\":\"Actualizar contraseña\",\"wallet_address\":\"Dirección de billetera\",\"request_verification_code\":\"Solicitar código de verificación\",\"save_information\":\"Guardar información\",\"loading\":\"Cargando\"},\"errors\":{\"name_is_required\":\"El nombre es obligatorio\",\"whatsapp_number_required\":\"El número de WhatsApp es obligatorio\",\"country_required\":\"El país es obligatorio\",\"state_required\":\"El estado es obligatorio\",\"city_required\":\"La ciudad es obligatoria\",\"profile_updated_successfully\":\"Perfil actualizado con éxito\",\"profile_update_failed\":\"Fallo al actualizar el perfil\",\"current_password_required\":\"La contraseña actual es obligatoria\",\"new_password_required\":\"La nueva contraseña es obligatoria\",\"password_min_length\":\"La contraseña debe tener al menos 8 caracteres\",\"passwords_do_not_match\":\"Las contraseñas no coinciden\",\"incorrect_verification_code\":\"El código de verificación es incorrecto\",\"wallet_address_required\":\"La dirección de la wallet es obligatoria\"},\"rank_view\":{\"menu_rank\":\"Ranks\",\"your_actual_score\":\"Tu calificación actual\",\"ranks\":{\"emprendedor\":\"Emprendedor\",\"constructor\":\"Constructor\",\"director\":\"Director\",\"director_premier\":\"Director Premier\",\"embajador\":\"Embajador\",\"diamond\":\"Diamante\",\"ejecutive_diamond\":\"Diamante Ejecutivo\",\"premier_diamond\":\"Diamante Premier\",\"black_diamond\":\"Diamante Negro\",\"crown_diamond\":\"Diamante Corona\",\"royal_diamond\":\"Diamante Royal\"}},\"landing\":{\"sections\":{\"discover_your_potential\":\"Descubre tu potencial\",\"join_dota\":\"Unirme a DOTA\",\"login_to_my_account\":\"Ingresar a mi cuenta\",\"dota_crypto_academy\":\"Academia Crypto de DOTA\",\"our_packages\":\"Nuestros paquetes\",\"learn_more_about_our_academy\":\"Conoce más de nuestra Academia en DOTA\",\"get\":\"Adquirir\",\"menu\":{\"home\":\"Inicio\",\"products\":\"Productos\",\"about_us\":\"Sobre nosotros\",\"sign_up\":\"Registrarse\"}},\"about_us\":{\"title\":\"Conoce más de nuestra Academia en DOTA\",\"welcome\":\"Bienvenido a DOTA, tu academia de confianza para el aprendizaje de trading de criptomonedas, desde lo básico hasta la maestría.\",\"experience\":\"En DOTA, nos enorgullece ofrecer una experiencia educativa excepcional diseñada específicamente para aquellos apasionados por el emocionante mundo de las criptomonedas y el trading.\",\"guidance\":\"En DOTA, entendemos que el universo de las criptomonedas puede parecer intimidante para muchos. Por eso, hemos reunido a un equipo de expertos en trading y criptomonedas que están aquí para guiarte en cada paso del camino, sin importar tu nivel de experiencia previa. Nuestros instructores no solo poseen un profundo conocimiento del mercado, sino que también tienen una pasión por compartir sus conocimientos y ayudarte a alcanzar tus metas financieras.\",\"courses\":\"Nuestros cursos están cuidadosamente diseñados para cubrir todos los aspectos del trading de criptomonedas, desde los fundamentos básicos hasta las estrategias más avanzadas. Ya sea que estés dando tus primeros pasos en el mundo del trading o busques perfeccionar tus habilidades existentes, en DOTA encontrarás cursos que se adaptan a tus necesidades y objetivos.\",\"highlight\":\"¿Qué nos hace destacar? En DOTA, no solo nos preocupamos por ofrecer contenido de alta calidad, sino que también nos esforzamos por crear una comunidad vibrante y solidaria. Nuestros estudiantes tienen acceso a foros de discusión, sesiones de preguntas y respuestas en vivo y eventos exclusivos donde pueden conectar con otros entusiastas del trading y compartir ideas y estrategias.\",\"evolution\":\"Además, entendemos que el mercado de criptomonedas está en constante evolución. Es por eso que nos comprometemos a mantener nuestros cursos actualizados con las últimas tendencias y desarrollos del mercado, para que puedas tomar decisiones informadas y estar un paso adelante.\",\"goal\":\"En DOTA, nuestro objetivo es proporcionarte las herramientas y el conocimiento necesarios para que te conviertas en un trader exitoso y confiado en el emocionante mundo de las criptomonedas. Únete a nosotros hoy y comienza tu viaje hacia el éxito financiero con DOTA.\",\"community\":\"¡Bienvenido a la comunidad DOTA, donde el aprendizaje y el éxito van de la mano!\"}},\"faq\":{\"open_tickets\":\"Tickets Abiertos\",\"open_new_ticket\":\"Abrir nuevo ticket\",\"title\":\"Título\",\"issue_title\":\"Título de tu problema\",\"description\":\"Descripción\",\"issue_description\":\"Descripción completa de tu problema\",\"change_email\":\"¿Cómo cambiar mi correo electrónico?\",\"missing_commission\":\"¿Por qué no ha llegado mi comisión?\",\"change_info\":\"¿Cómo cambiar mi información?\",\"wrong_commission_amount\":\"Mi comisión tiene un monto mayor o menor (es erróneo)\",\"purchase_not_approved\":\"Mi compra no está aprobada pero ya realicé el pago\",\"purchase_deleted\":\"Compra eliminada por error\",\"unrecognized_charge\":\"Hicieron un cargo no reconocido\"},\"countries\":\"Países\",\"sign_up\":{\"signup_title\":\"Regístrate. Es fácil y rápido\",\"referred_by\":\"Referido por\",\"full_name\":\"Nombre y Apellidos\",\"username\":\"Usuario\",\"email\":\"Email\",\"confirm_email\":\"Confirmar Email\",\"password\":\"Contraseña\",\"confirm_password\":\"Confirma tu contraseña\",\"country\":\"País\",\"code\":\"Codigo\",\"phone\":\"Celular\",\"accept_terms\":\"Acepto los\",\"terms\":\"Términos\",\"privacy_policy\":\"Política de Privacidad\",\"register\":\"Registrarse\",\"username_no_spaces\":\"El nombre de usuario no puede contener espacios\",\"select_country\":\"Selecciona un país de la lista\",\"and\":\"y\",\"user_registered_success\":\"Usuario registrado correctamente\"}}"));}}),
"[project]/src/utils/i18n.ts [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$i18next$2f$dist$2f$esm$2f$i18next$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/i18next/dist/esm/i18next.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$translations$2f$en$2e$json__$28$json$29$__ = __turbopack_import__("[project]/src/utils/translations/en.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$translations$2f$es$2e$json__$28$json$29$__ = __turbopack_import__("[project]/src/utils/translations/es.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/react-i18next/dist/es/index.js [client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$initReactI18next$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react-i18next/dist/es/initReactI18next.js [client] (ecmascript)");
;
;
;
;
const resources = {
    en: {
        ns1: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$translations$2f$en$2e$json__$28$json$29$__["default"]
    },
    es: {
        ns1: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$translations$2f$es$2e$json__$28$json$29$__["default"]
    }
};
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$i18next$2f$dist$2f$esm$2f$i18next$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].use(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$initReactI18next$2e$js__$5b$client$5d$__$28$ecmascript$29$__["initReactI18next"]).init({
    detection: {
        order: [
            "localStorage"
        ],
        lookupLocalStorage: "i18nextLng",
        caches: [
            "localStorage"
        ]
    },
    supportedLngs: [
        "es",
        "en"
    ],
    ns: [
        "ns1"
    ],
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
        escapeValue: false
    }
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/pages/_app.tsx [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>App)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nprogress$2f$nprogress$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/nprogress/nprogress.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/router.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next-auth/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$poppins_53cb8bd0$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[next]/internal/font/google/poppins_53cb8bd0.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$i18n$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/utils/i18n.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react-hot-toast/dist/index.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$system$2f$dist$2f$chunk$2d$OKNU54ZL$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@heroui/system/dist/chunk-OKNU54ZL.mjs [client] (ecmascript)");
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
function App({ Component, pageProps: { session, ...pageProps } }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "App.useEffect": ()=>{
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty("--vh", `${vh}px`);
        }
    }["App.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "App.useEffect": ()=>{
            const handleRouteStart = {
                "App.useEffect.handleRouteStart": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nprogress$2f$nprogress$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].start()
            }["App.useEffect.handleRouteStart"];
            const handleRouteDone = {
                "App.useEffect.handleRouteDone": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nprogress$2f$nprogress$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].done()
            }["App.useEffect.handleRouteDone"];
            router.events.on("routeChangeStart", handleRouteStart);
            router.events.on("routeChangeComplete", handleRouteDone);
            router.events.on("routeChangeError", handleRouteDone);
            return ({
                "App.useEffect": ()=>{
                    router.events.off("routeChangeStart", handleRouteStart);
                    router.events.off("routeChangeComplete", handleRouteDone);
                    router.events.off("routeChangeError", handleRouteDone);
                }
            })["App.useEffect"];
        }
    }["App.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["SessionProvider"], {
        session: session,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$heroui$2f$system$2f$dist$2f$chunk$2d$OKNU54ZL$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["HeroUIProvider"], {
            navigate: router.push,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["Toaster"], {
                    position: "top-right"
                }, void 0, false, {
                    fileName: "[project]/src/pages/_app.tsx",
                    lineNumber: 43,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                    className: __TURBOPACK__imported__module__$5b$next$5d2f$internal$2f$font$2f$google$2f$poppins_53cb8bd0$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].className,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Component, {
                            ...pageProps
                        }, void 0, false, {
                            fileName: "[project]/src/pages/_app.tsx",
                            lineNumber: 45,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            id: "copyInput",
                            className: "hidden"
                        }, void 0, false, {
                            fileName: "[project]/src/pages/_app.tsx",
                            lineNumber: 46,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/_app.tsx",
                    lineNumber: 44,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/pages/_app.tsx",
            lineNumber: 42,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/pages/_app.tsx",
        lineNumber: 41,
        columnNumber: 5
    }, this);
}
_s(App, "TvQOAa6MuxS5wkANqefpxaThEc4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = App;
var _c;
__turbopack_refresh__.register(_c, "App");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/src/pages/_app.tsx [client] (ecmascript)\" } [client] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
const PAGE_PATH = "/_app";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_require__("[project]/src/pages/_app.tsx [client] (ecmascript)");
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
"[project]/src/pages/_app (hmr-entry)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, m: module, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_require__("[next]/entry/page-loader.ts { PAGE => \"[project]/src/pages/_app.tsx [client] (ecmascript)\" } [client] (ecmascript)");
}}),
}]);

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__a764e4._.js.map