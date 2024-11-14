"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [520], {
        2854: function (e, t, r) {
            r.d(t, {
                _: function () {
                    return i
                }
            });
            var s = r(9477);
            let n = new WeakMap;
            class i extends s.aNw {
                constructor(e) {
                    super(e), this.decoderPath = "", this.decoderConfig = {}, this.decoderBinary = null, this.decoderPending = null, this.workerLimit = 4, this.workerPool = [], this.workerNextTaskID = 1, this.workerSourceURL = "", this.defaultAttributeIDs = {
                        position: "POSITION",
                        normal: "NORMAL",
                        color: "COLOR",
                        uv: "TEX_COORD"
                    }, this.defaultAttributeTypes = {
                        position: "Float32Array",
                        normal: "Float32Array",
                        color: "Float32Array",
                        uv: "Float32Array"
                    }
                }
                setDecoderPath(e) {
                    return this.decoderPath = e, this
 s               }
                setDecoderConfig(e) {
                    return this.decoderConfig = e, this
                }
                setWorkerLimit(e) {
                    return this.workerLimit = e, this
                }
                load(e, t, r, n) {
                    let i = new s.hH6(this.manager);
                    i.setPath(this.path), i.setResponseType("arraybuffer"), i.setRequestHeader(this.requestHeader), i.setWithCredentials(this.withCredentials), i.load(e, e => {
                        this.parse(e, t, n)
                    }, r, n)
                }
                parse(e, t, r) {
                    this.decodeDracoFile(e, t, null, null, s.KI_).catch(r)
                }
                decodeDracoFile(e, t, r, n, i = s.GUF) {
                    let o = {
                        attributeIDs: r || this.defaultAttributeIDs,
                        attributeTypes: n || this.defaultAttributeTypes,
                        useUniqueIDs: !!r,
                        vertexColorSpace: i
                    };
                    return this.decodeGeometry(e, o).then(t)
                }
                decodeGeometry(e, t) {
                    let r;
                    let s = JSON.stringify(t);
                    if (n.has(e)) {
                        let t = n.get(e);
                        if (t.key === s) return t.promise;
                        if (0 === e.byteLength) throw Error("THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.")
                    }
                    let i = this.workerNextTaskID++,
                        o = e.byteLength,
                        a = this._getWorker(i, o).then(s => (r = s, new Promise((s, n) => {
                            r._callbacks[i] = {
                                resolve: s,
                                reject: n
                            }, r.postMessage({
                                type: "decode",
                                id: i,
                                taskConfig: t,
                                buffer: e
                            }, [e])
                        }))).then(e => this._createGeometry(e.geometry));
                    return a.catch(() => !0).then(() => {
                        r && i && this._releaseTask(r, i)
                    }), n.set(e, {
                        key: s,
                        promise: a
                    }), a
                }
                _createGeometry(e) {
                    let t = new s.u9r;
                    e.index && t.setIndex(new s.TlE(e.index.array, 1));
                    for (let r = 0; r < e.attributes.length; r++) {
                        let n = e.attributes[r],
                            i = n.name,
                            o = n.array,
                            a = n.itemSize,
                            l = new s.TlE(o, a);
                        "color" === i && (this._assignVertexColorSpace(l, n.vertexColorSpace), l.normalized = o instanceof Float32Array == !1), t.setAttribute(i, l)
                    }
                    return t
                }
                _assignVertexColorSpace(e, t) {
                    if (t !== s.KI_) return;
                    let r = new s.Ilk;
                    for (let t = 0, s = e.count; t < s; t++) r.fromBufferAttribute(e, t).convertSRGBToLinear(), e.setXYZ(t, r.r, r.g, r.b)
                }
                _loadLibrary(e, t) {
                    let r = new s.hH6(this.manager);
                    return r.setPath(this.decoderPath), r.setResponseType(t), r.setWithCredentials(this.withCredentials), new Promise((t, s) => {
                        r.load(e, t, void 0, s)
                    })
                }
                preload() {
                    return this._initDecoder(), this
                }
                _initDecoder() {
                    if (this.decoderPending) return this.decoderPending;
                    let e = "object" != typeof WebAssembly || "js" === this.decoderConfig.type,
                        t = [];
                    return e ? t.push(this._loadLibrary("draco_decoder.js", "text")) : (t.push(this._loadLibrary("draco_wasm_wrapper.js", "text")), t.push(this._loadLibrary("draco_decoder.wasm", "arraybuffer"))), this.decoderPending = Promise.all(t).then(t => {
                        let r = t[0];
                        e || (this.decoderConfig.wasmBinary = t[1]);
                        let s = o.toString(),
                            n = ["/* draco decoder */", r, "", "/* worker */", s.substring(s.indexOf("{") + 1, s.lastIndexOf("}"))].join("\n");
                        this.workerSourceURL = URL.createObjectURL(new Blob([n]))
                    }), this.decoderPending
                }
                _getWorker(e, t) {
                    return this._initDecoder().then(() => {
                        if (this.workerPool.length < this.workerLimit) {
                            let e = new Worker(this.workerSourceURL);
                            e._callbacks = {}, e._taskCosts = {}, e._taskLoad = 0, e.postMessage({
                                type: "init",
                                decoderConfig: this.decoderConfig
                            }), e.onmessage = function (t) {
                                let r = t.data;
                                switch (r.type) {
                                    case "decode":
                                        e._callbacks[r.id].resolve(r);
                                        break;
                                    case "error":
                                        e._callbacks[r.id].reject(r);
                                        break;
                                    default:
                                        console.error('THREE.DRACOLoader: Unexpected message, "' + r.type + '"')
                                }
                            }, this.workerPool.push(e)
                        } else this.workerPool.sort(function (e, t) {
                            return e._taskLoad > t._taskLoad ? -1 : 1
                        });
                        let r = this.workerPool[this.workerPool.length - 1];
                        return r._taskCosts[e] = t, r._taskLoad += t, r
                    })
                }
                _releaseTask(e, t) {
                    e._taskLoad -= e._taskCosts[t], delete e._callbacks[t], delete e._taskCosts[t]
                }
                debug() {
                    console.log("Task load: ", this.workerPool.map(e => e._taskLoad))
                }
                dispose() {
                    for (let e = 0; e < this.workerPool.length; ++e) this.workerPool[e].terminate();
                    return this.workerPool.length = 0, "" !== this.workerSourceURL && URL.revokeObjectURL(this.workerSourceURL), this
                }
            }

            function o() {
                let e, t;
                onmessage = function (r) {
                    let s = r.data;
                    switch (s.type) {
                        case "init":
                            e = s.decoderConfig, t = new Promise(function (t) {
                                e.onModuleLoaded = function (e) {
                                    t({
                                        draco: e
                                    })
                                }, DracoDecoderModule(e)
                            });
                            break;
                        case "decode":
                            let n = s.buffer,
                                i = s.taskConfig;
                            t.then(e => {
                                let t = e.draco,
                                    r = new t.Decoder;
                                try {
                                    let e = function (e, t, r, s) {
                                            let n, i;
                                            let o = s.attributeIDs,
                                                a = s.attributeTypes,
                                                l = t.GetEncodedGeometryType(r);
                                            if (l === e.TRIANGULAR_MESH) n = new e.Mesh, i = t.DecodeArrayToMesh(r, r.byteLength, n);
                                            else if (l === e.POINT_CLOUD) n = new e.PointCloud, i = t.DecodeArrayToPointCloud(r, r.byteLength, n);
                                            else throw Error("THREE.DRACOLoader: Unexpected geometry type.");
                                            if (!i.ok() || 0 === n.ptr) throw Error("THREE.DRACOLoader: Decoding failed: " + i.error_msg());
                                            let u = {
                                                index: null,
                                                attributes: []
                                            };
                                            for (let r in o) {
                                                let i, l;
                                                let c = self[a[r]];
                                                if (s.useUniqueIDs) l = o[r], i = t.GetAttributeByUniqueId(n, l);
                                                else {
                                                    if (-1 === (l = t.GetAttributeId(n, e[o[r]]))) continue;
                                                    i = t.GetAttribute(n, l)
                                                }
                                                let h = function (e, t, r, s, n, i) {
                                                    let o = i.num_components(),
                                                        a = r.num_points(),
                                                        l = a * o,
                                                        u = l * n.BYTES_PER_ELEMENT,
                                                        c = function (e, t) {
                                                            switch (t) {
                                                                case Float32Array:
                                                                    return e.DT_FLOAT32;
                                                                case Int8Array:
                                                                    return e.DT_INT8;
                                                                case Int16Array:
                                                                    return e.DT_INT16;
                                                                case Int32Array:
                                                                    return e.DT_INT32;
                                                                case Uint8Array:
                                                                    return e.DT_UINT8;
                                                                case Uint16Array:
                                                                    return e.DT_UINT16;
                                                                case Uint32Array:
                                                                    return e.DT_UINT32
                                                            }
                                                        }(e, n),
                                                        h = e._malloc(u);
                                                    t.GetAttributeDataArrayForAllPoints(r, i, c, u, h);
                                                    let d = new n(e.HEAPF32.buffer, h, l).slice();
                                                    return e._free(h), {
                                                        name: s,
                                                        array: d,
                                                        itemSize: o
                                                    }
                                                }(e, t, n, r, c, i);
                                                "color" === r && (h.vertexColorSpace = s.vertexColorSpace), u.attributes.push(h)
                                            }
                                            return l === e.TRIANGULAR_MESH && (u.index = function (e, t, r) {
                                                let s = r.num_faces(),
                                                    n = 3 * s,
                                                    i = 4 * n,
                                                    o = e._malloc(i);
                                                t.GetTrianglesUInt32Array(r, i, o);
                                                let a = new Uint32Array(e.HEAPF32.buffer, o, n).slice();
                                                return e._free(o), {
                                                    array: a,
                                                    itemSize: 1
                                                }
                                            }(e, t, n)), e.destroy(n), u
                                        }(t, r, new Int8Array(n), i),
                                        o = e.attributes.map(e => e.array.buffer);
                                    e.index && o.push(e.index.array.buffer), self.postMessage({
                                        type: "decode",
                                        id: s.id,
                                        geometry: e
                                    }, o)
                                } catch (e) {
                                    console.error(e), self.postMessage({
                                        type: "error",
                                        id: s.id,
                                        error: e.message
                                    })
                                } finally {
                                    t.destroy(r)
                                }
                            })
                    }
                }
            }
        },
        7836: function (e, t, r) {
            r.d(t, {
                E: function () {
                    return i
                }
            });
            var s = r(9477);

            function n(e, t) {
                if (t === s.WwZ) return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."), e;
                if (t !== s.z$h && t !== s.UlW) return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:", t), e; {
                    let r = e.getIndex();
                    if (null === r) {
                        let t = [],
                            s = e.getAttribute("position");
                        if (void 0 === s) return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."), e;
                        for (let e = 0; e < s.count; e++) t.push(e);
                        e.setIndex(t), r = e.getIndex()
                    }
                    let n = r.count - 2,
                        i = [];
                    if (t === s.z$h)
                        for (let e = 1; e <= n; e++) i.push(r.getX(0)), i.push(r.getX(e)), i.push(r.getX(e + 1));
                    else
                        for (let e = 0; e < n; e++) e % 2 == 0 ? (i.push(r.getX(e)), i.push(r.getX(e + 1)), i.push(r.getX(e + 2))) : (i.push(r.getX(e + 2)), i.push(r.getX(e + 1)), i.push(r.getX(e)));
                    i.length / 3 !== n && console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");
                    let o = e.clone();
                    return o.setIndex(i), o.clearGroups(), o
                }
            }
            class i extends s.aNw {
                constructor(e) {
                    super(e), this.dracoLoader = null, this.ktx2Loader = null, this.meshoptDecoder = null, this.pluginCallbacks = [], this.register(function (e) {
                        return new h(e)
                    }), this.register(function (e) {
                        return new x(e)
                    }), this.register(function (e) {
                        return new R(e)
                    }), this.register(function (e) {
                        return new _(e)
                    }), this.register(function (e) {
                        return new p(e)
                    }), this.register(function (e) {
                        return new m(e)
                    }), this.register(function (e) {
                        return new f(e)
                    }), this.register(function (e) {
                        return new A(e)
                    }), this.register(function (e) {
                        return new c(e)
                    }), this.register(function (e) {
                        return new g(e)
                    }), this.register(function (e) {
                        return new d(e)
                    }), this.register(function (e) {
                        return new T(e)
                    }), this.register(function (e) {
                        return new l(e)
                    }), this.register(function (e) {
                        return new E(e)
                    }), this.register(function (e) {
                        return new y(e)
                    })
                }
                load(e, t, r, n) {
                    let i;
                    let o = this;
                    i = "" !== this.resourcePath ? this.resourcePath : "" !== this.path ? this.path : s.Zp0.extractUrlBase(e), this.manager.itemStart(e);
                    let a = function (t) {
                            n ? n(t) : console.error(t), o.manager.itemError(e), o.manager.itemEnd(e)
                        },
                        l = new s.hH6(this.manager);
                    l.setPath(this.path), l.setResponseType("arraybuffer"), l.setRequestHeader(this.requestHeader), l.setWithCredentials(this.withCredentials), l.load(e, function (r) {
                        try {
                            o.parse(r, i, function (r) {
                                t(r), o.manager.itemEnd(e)
                            }, a)
                        } catch (e) {
                            a(e)
                        }
                    }, r, a)
                }
                setDRACOLoader(e) {
                    return this.dracoLoader = e, this
                }
                setDDSLoader() {
                    throw Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')
                }
                setKTX2Loader(e) {
                    return this.ktx2Loader = e, this
                }
                setMeshoptDecoder(e) {
                    return this.meshoptDecoder = e, this
                }
                register(e) {
                    return -1 === this.pluginCallbacks.indexOf(e) && this.pluginCallbacks.push(e), this
                }
                unregister(e) {
                    return -1 !== this.pluginCallbacks.indexOf(e) && this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e), 1), this
                }
                parse(e, t, r, s) {
                    let n;
                    let i = {},
                        o = {},
                        l = new TextDecoder;
                    if ("string" == typeof e) n = JSON.parse(e);
                    else if (e instanceof ArrayBuffer) {
                        let t = l.decode(new Uint8Array(e, 0, 4));
                        if (t === w) {
                            try {
                                i[a.KHR_BINARY_GLTF] = new b(e)
                            } catch (e) {
                                s && s(e);
                                return
                            }
                            n = JSON.parse(i[a.KHR_BINARY_GLTF].content)
                        } else n = JSON.parse(l.decode(e))
                    } else n = e;
                    if (void 0 === n.asset || n.asset.version[0] < 2) {
                        s && s(Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));
                        return
                    }
                    let c = new W(n, {
                        path: t || this.resourcePath || "",
                        crossOrigin: this.crossOrigin,
                        requestHeader: this.requestHeader,
                        manager: this.manager,
                        ktx2Loader: this.ktx2Loader,
                        meshoptDecoder: this.meshoptDecoder
                    });
                    c.fileLoader.setRequestHeader(this.requestHeader);
                    for (let e = 0; e < this.pluginCallbacks.length; e++) {
                        let t = this.pluginCallbacks[e](c);
                        o[t.name] = t, i[t.name] = !0
                    }
                    if (n.extensionsUsed)
                        for (let e = 0; e < n.extensionsUsed.length; ++e) {
                            let t = n.extensionsUsed[e],
                                r = n.extensionsRequired || [];
                            switch (t) {
                                case a.KHR_MATERIALS_UNLIT:
                                    i[t] = new u;
                                    break;
                                case a.KHR_DRACO_MESH_COMPRESSION:
                                    i[t] = new L(n, this.dracoLoader);
                                    break;
                                case a.KHR_TEXTURE_TRANSFORM:
                                    i[t] = new I;
                                    break;
                                case a.KHR_MESH_QUANTIZATION:
                                    i[t] = new S;
                                    break;
                                default:
                                    r.indexOf(t) >= 0 && void 0 === o[t] && console.warn('THREE.GLTFLoader: Unknown extension "' + t + '".')
                            }
                        }
                    c.setExtensions(i), c.setPlugins(o), c.parse(r, s)
                }
                parseAsync(e, t) {
                    let r = this;
                    return new Promise(function (s, n) {
                        r.parse(e, t, s, n)
                    })
                }
            }

            function o() {
                let e = {};
                return {
                    get: function (t) {
                        return e[t]
                    },
                    add: function (t, r) {
                        e[t] = r
                    },
                    remove: function (t) {
                        delete e[t]
                    },
                    removeAll: function () {
                        e = {}
                    }
                }
            }
            let a = {
                KHR_BINARY_GLTF: "KHR_binary_glTF",
                KHR_DRACO_MESH_COMPRESSION: "KHR_draco_mesh_compression",
                KHR_LIGHTS_PUNCTUAL: "KHR_lights_punctual",
                KHR_MATERIALS_CLEARCOAT: "KHR_materials_clearcoat",
                KHR_MATERIALS_IOR: "KHR_materials_ior",
                KHR_MATERIALS_SHEEN: "KHR_materials_sheen",
                KHR_MATERIALS_SPECULAR: "KHR_materials_specular",
                KHR_MATERIALS_TRANSMISSION: "KHR_materials_transmission",
                KHR_MATERIALS_IRIDESCENCE: "KHR_materials_iridescence",
                KHR_MATERIALS_ANISOTROPY: "KHR_materials_anisotropy",
                KHR_MATERIALS_UNLIT: "KHR_materials_unlit",
                KHR_MATERIALS_VOLUME: "KHR_materials_volume",
                KHR_TEXTURE_BASISU: "KHR_texture_basisu",
                KHR_TEXTURE_TRANSFORM: "KHR_texture_transform",
                KHR_MESH_QUANTIZATION: "KHR_mesh_quantization",
                KHR_MATERIALS_EMISSIVE_STRENGTH: "KHR_materials_emissive_strength",
                EXT_TEXTURE_WEBP: "EXT_texture_webp",
                EXT_TEXTURE_AVIF: "EXT_texture_avif",
                EXT_MESHOPT_COMPRESSION: "EXT_meshopt_compression",
                EXT_MESH_GPU_INSTANCING: "EXT_mesh_gpu_instancing"
            };
            class l {
                constructor(e) {
                    this.parser = e, this.name = a.KHR_LIGHTS_PUNCTUAL, this.cache = {
                        refs: {},
                        uses: {}
                    }
                }
                _markDefs() {
                    let e = this.parser,
                        t = this.parser.json.nodes || [];
                    for (let r = 0, s = t.length; r < s; r++) {
                        let s = t[r];
                        s.extensions && s.extensions[this.name] && void 0 !== s.extensions[this.name].light && e._addNodeRef(this.cache, s.extensions[this.name].light)
                    }
                }
                _loadLight(e) {
                    let t;
                    let r = this.parser,
                        n = "light:" + e,
                        i = r.cache.get(n);
                    if (i) return i;
                    let o = r.json,
                        a = o.extensions && o.extensions[this.name] || {},
                        l = a.lights || [],
                        u = l[e],
                        c = new s.Ilk(16777215);
                    void 0 !== u.color && c.setRGB(u.color[0], u.color[1], u.color[2], s.GUF);
                    let h = void 0 !== u.range ? u.range : 0;
                    switch (u.type) {
                        case "directional":
                            (t = new s.Ox3(c)).target.position.set(0, 0, -1), t.add(t.target);
                            break;
                        case "point":
                            (t = new s.cek(c)).distance = h;
                            break;
                        case "spot":
                            (t = new s.PMe(c)).distance = h, u.spot = u.spot || {}, u.spot.innerConeAngle = void 0 !== u.spot.innerConeAngle ? u.spot.innerConeAngle : 0, u.spot.outerConeAngle = void 0 !== u.spot.outerConeAngle ? u.spot.outerConeAngle : Math.PI / 4, t.angle = u.spot.outerConeAngle, t.penumbra = 1 - u.spot.innerConeAngle / u.spot.outerConeAngle, t.target.position.set(0, 0, -1), t.add(t.target);
                            break;
                        default:
                            throw Error("THREE.GLTFLoader: Unexpected light type: " + u.type)
                    }
                    return t.position.set(0, 0, 0), t.decay = 2, K(t, u), void 0 !== u.intensity && (t.intensity = u.intensity), t.name = r.createUniqueName(u.name || "light_" + e), i = Promise.resolve(t), r.cache.add(n, i), i
                }
                getDependency(e, t) {
                    if ("light" === e) return this._loadLight(t)
                }
                createNodeAttachment(e) {
                    let t = this,
                        r = this.parser,
                        s = r.json,
                        n = s.nodes[e],
                        i = n.extensions && n.extensions[this.name] || {},
                        o = i.light;
                    return void 0 === o ? null : this._loadLight(o).then(function (e) {
                        return r._getNodeRef(t.cache, o, e)
                    })
                }
            }
            class u {
                constructor() {
                    this.name = a.KHR_MATERIALS_UNLIT
                }
                getMaterialType() {
                    return s.vBJ
                }
                extendParams(e, t, r) {
                    let n = [];
                    e.color = new s.Ilk(1, 1, 1), e.opacity = 1;
                    let i = t.pbrMetallicRoughness;
                    if (i) {
                        if (Array.isArray(i.baseColorFactor)) {
                            let t = i.baseColorFactor;
                            e.color.setRGB(t[0], t[1], t[2], s.GUF), e.opacity = t[3]
                        }
                        void 0 !== i.baseColorTexture && n.push(r.assignTexture(e, "map", i.baseColorTexture, s.KI_))
                    }
                    return Promise.all(n)
                }
            }
            class c {
                constructor(e) {
                    this.parser = e, this.name = a.KHR_MATERIALS_EMISSIVE_STRENGTH
                }
                extendMaterialParams(e, t) {
                    let r = this.parser,
                        s = r.json.materials[e];
                    if (!s.extensions || !s.extensions[this.name]) return Promise.resolve();
                    let n = s.extensions[this.name].emissiveStrength;
                    return void 0 !== n && (t.emissiveIntensity = n), Promise.resolve()
                }
            }
            class h {
                constructor(e) {
                    this.parser = e, this.name = a.KHR_MATERIALS_CLEARCOAT
                }
                getMaterialType(e) {
                    let t = this.parser,
                        r = t.json.materials[e];
                    return r.extensions && r.extensions[this.name] ? s.EJi : null
                }
                extendMaterialParams(e, t) {
                    let r = this.parser,
                        n = r.json.materials[e];
                    if (!n.extensions || !n.extensions[this.name]) return Promise.resolve();
                    let i = [],
                        o = n.extensions[this.name];
                    if (void 0 !== o.clearcoatFactor && (t.clearcoat = o.clearcoatFactor), void 0 !== o.clearcoatTexture && i.push(r.assignTexture(t, "clearcoatMap", o.clearcoatTexture)), void 0 !== o.clearcoatRoughnessFactor && (t.clearcoatRoughness = o.clearcoatRoughnessFactor), void 0 !== o.clearcoatRoughnessTexture && i.push(r.assignTexture(t, "clearcoatRoughnessMap", o.clearcoatRoughnessTexture)), void 0 !== o.clearcoatNormalTexture && (i.push(r.assignTexture(t, "clearcoatNormalMap", o.clearcoatNormalTexture)), void 0 !== o.clearcoatNormalTexture.scale)) {
                        let e = o.clearcoatNormalTexture.scale;
                        t.clearcoatNormalScale = new s.FM8(e, e)
                    }
                    return Promise.all(i)
                }
            }
            class d {
                constructor(e) {
                    this.parser = e, this.name = a.KHR_MATERIALS_IRIDESCENCE
                }
                getMaterialType(e) {
                    let t = this.parser,
                        r = t.json.materials[e];
                    return r.extensions && r.extensions[this.name] ? s.EJi : null
                }
                extendMaterialParams(e, t) {
                    let r = this.parser,
                        s = r.json.materials[e];
                    if (!s.extensions || !s.extensions[this.name]) return Promise.resolve();
                    let n = [],
                        i = s.extensions[this.name];
                    return void 0 !== i.iridescenceFactor && (t.iridescence = i.iridescenceFactor), void 0 !== i.iridescenceTexture && n.push(r.assignTexture(t, "iridescenceMap", i.iridescenceTexture)), void 0 !== i.iridescenceIor && (t.iridescenceIOR = i.iridescenceIor), void 0 === t.iridescenceThicknessRange && (t.iridescenceThicknessRange = [100, 400]), void 0 !== i.iridescenceThicknessMinimum && (t.iridescenceThicknessRange[0] = i.iridescenceThicknessMinimum), void 0 !== i.iridescenceThicknessMaximum && (t.iridescenceThicknessRange[1] = i.iridescenceThicknessMaximum), void 0 !== i.iridescenceThicknessTexture && n.push(r.assignTexture(t, "iridescenceThicknessMap", i.iridescenceThicknessTexture)), Promise.all(n)
                }
            }
            class p {
                constructor(e) {
                    this.parser = e, this.name = a.KHR_MATERIALS_SHEEN
                }
                getMaterialType(e) {
                    let t = this.parser,
                        r = t.json.materials[e];
                    return r.extensions && r.extensions[this.name] ? s.EJi : null
                }
                extendMaterialParams(e, t) {
                    let r = this.parser,
                        n = r.json.materials[e];
                    if (!n.extensions || !n.extensions[this.name]) return Promise.resolve();
                    let i = [];
                    t.sheenColor = new s.Ilk(0, 0, 0), t.sheenRoughness = 0, t.sheen = 1;
                    let o = n.extensions[this.name];
                    if (void 0 !== o.sheenColorFactor) {
                        let e = o.sheenColorFactor;
                        t.sheenColor.setRGB(e[0], e[1], e[2], s.GUF)
                    }
                    return void 0 !== o.sheenRoughnessFactor && (t.sheenRoughness = o.sheenRoughnessFactor), void 0 !== o.sheenColorTexture && i.push(r.assignTexture(t, "sheenColorMap", o.sheenColorTexture, s.KI_)), void 0 !== o.sheenRoughnessTexture && i.push(r.assignTexture(t, "sheenRoughnessMap", o.sheenRoughnessTexture)), Promise.all(i)
                }
            }
            class m {
                constructor(e) {
                    this.parser = e, this.name = a.KHR_MATERIALS_TRANSMISSION
                }
                getMaterialType(e) {
                    let t = this.parser,
                        r = t.json.materials[e];
                    return r.extensions && r.extensions[this.name] ? s.EJi : null
                }
                extendMaterialParams(e, t) {
                    let r = this.parser,
                        s = r.json.materials[e];
                    if (!s.extensions || !s.extensions[this.name]) return Promise.resolve();
                    let n = [],
                        i = s.extensions[this.name];
                    return void 0 !== i.transmissionFactor && (t.transmission = i.transmissionFactor), void 0 !== i.transmissionTexture && n.push(r.assignTexture(t, "transmissionMap", i.transmissionTexture)), Promise.all(n)
                }
            }
            class f {
                constructor(e) {
                    this.parser = e, this.name = a.KHR_MATERIALS_VOLUME
                }
                getMaterialType(e) {
                    let t = this.parser,
                        r = t.json.materials[e];
                    return r.extensions && r.extensions[this.name] ? s.EJi : null
                }
                extendMaterialParams(e, t) {
                    let r = this.parser,
                        n = r.json.materials[e];
                    if (!n.extensions || !n.extensions[this.name]) return Promise.resolve();
                    let i = [],
                        o = n.extensions[this.name];
                    t.thickness = void 0 !== o.thicknessFactor ? o.thicknessFactor : 0, void 0 !== o.thicknessTexture && i.push(r.assignTexture(t, "thicknessMap", o.thicknessTexture)), t.attenuationDistance = o.attenuationDistance || 1 / 0;
                    let a = o.attenuationColor || [1, 1, 1];
                    return t.attenuationColor = new s.Ilk().setRGB(a[0], a[1], a[2], s.GUF), Promise.all(i)
                }
            }
            class A {
                constructor(e) {
                    this.parser = e, this.name = a.KHR_MATERIALS_IOR
                }
                getMaterialType(e) {
                    let t = this.parser,
                        r = t.json.materials[e];
                    return r.extensions && r.extensions[this.name] ? s.EJi : null
                }
                extendMaterialParams(e, t) {
                    let r = this.parser,
                        s = r.json.materials[e];
                    if (!s.extensions || !s.extensions[this.name]) return Promise.resolve();
                    let n = s.extensions[this.name];
                    return t.ior = void 0 !== n.ior ? n.ior : 1.5, Promise.resolve()
                }
            }
            class g {
                constructor(e) {
                    this.parser = e, this.name = a.KHR_MATERIALS_SPECULAR
                }
                getMaterialType(e) {
                    let t = this.parser,
                        r = t.json.materials[e];
                    return r.extensions && r.extensions[this.name] ? s.EJi : null
                }
                extendMaterialParams(e, t) {
                    let r = this.parser,
                        n = r.json.materials[e];
                    if (!n.extensions || !n.extensions[this.name]) return Promise.resolve();
                    let i = [],
                        o = n.extensions[this.name];
                    t.specularIntensity = void 0 !== o.specularFactor ? o.specularFactor : 1, void 0 !== o.specularTexture && i.push(r.assignTexture(t, "specularIntensityMap", o.specularTexture));
                    let a = o.specularColorFactor || [1, 1, 1];
                    return t.specularColor = new s.Ilk().setRGB(a[0], a[1], a[2], s.GUF), void 0 !== o.specularColorTexture && i.push(r.assignTexture(t, "specularColorMap", o.specularColorTexture, s.KI_)), Promise.all(i)
                }
            }
            class T {
                constructor(e) {
                    this.parser = e, this.name = a.KHR_MATERIALS_ANISOTROPY
                }
                getMaterialType(e) {
                    let t = this.parser,
                        r = t.json.materials[e];
                    return r.extensions && r.extensions[this.name] ? s.EJi : null
                }
                extendMaterialParams(e, t) {
                    let r = this.parser,
                        s = r.json.materials[e];
                    if (!s.extensions || !s.extensions[this.name]) return Promise.resolve();
                    let n = [],
                        i = s.extensions[this.name];
                    return void 0 !== i.anisotropyStrength && (t.anisotropy = i.anisotropyStrength), void 0 !== i.anisotropyRotation && (t.anisotropyRotation = i.anisotropyRotation), void 0 !== i.anisotropyTexture && n.push(r.assignTexture(t, "anisotropyMap", i.anisotropyTexture)), Promise.all(n)
                }
            }
            class x {
                constructor(e) {
                    this.parser = e, this.name = a.KHR_TEXTURE_BASISU
                }
                loadTexture(e) {
                    let t = this.parser,
                        r = t.json,
                        s = r.textures[e];
                    if (!s.extensions || !s.extensions[this.name]) return null;
                    let n = s.extensions[this.name],
                        i = t.options.ktx2Loader;
                    if (!i) {
                        if (!(r.extensionsRequired && r.extensionsRequired.indexOf(this.name) >= 0)) return null;
                        throw Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures")
                    }
                    return t.loadTextureImage(e, n.source, i)
                }
            }
            class R {
                constructor(e) {
                    this.parser = e, this.name = a.EXT_TEXTURE_WEBP, this.isSupported = null
                }
                loadTexture(e) {
                    let t = this.name,
                        r = this.parser,
                        s = r.json,
                        n = s.textures[e];
                    if (!n.extensions || !n.extensions[t]) return null;
                    let i = n.extensions[t],
                        o = s.images[i.source],
                        a = r.textureLoader;
                    if (o.uri) {
                        let e = r.options.manager.getHandler(o.uri);
                        null !== e && (a = e)
                    }
                    return this.detectSupport().then(function (n) {
                        if (n) return r.loadTextureImage(e, i.source, a);
                        if (s.extensionsRequired && s.extensionsRequired.indexOf(t) >= 0) throw Error("THREE.GLTFLoader: WebP required by asset but unsupported.");
                        return r.loadTexture(e)
                    })
                }
                detectSupport() {
                    return this.isSupported || (this.isSupported = new Promise(function (e) {
                        let t = new Image;
                        t.src = "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA", t.onload = t.onerror = function () {
                            e(1 === t.height)
                        }
                    })), this.isSupported
                }
            }
            class _ {
                constructor(e) {
                    this.parser = e, this.name = a.EXT_TEXTURE_AVIF, this.isSupported = null
                }
                loadTexture(e) {
                    let t = this.name,
                        r = this.parser,
                        s = r.json,
                        n = s.textures[e];
                    if (!n.extensions || !n.extensions[t]) return null;
                    let i = n.extensions[t],
                        o = s.images[i.source],
                        a = r.textureLoader;
                    if (o.uri) {
                        let e = r.options.manager.getHandler(o.uri);
                        null !== e && (a = e)
                    }
                    return this.detectSupport().then(function (n) {
                        if (n) return r.loadTextureImage(e, i.source, a);
                        if (s.extensionsRequired && s.extensionsRequired.indexOf(t) >= 0) throw Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");
                        return r.loadTexture(e)
                    })
                }
                detectSupport() {
                    return this.isSupported || (this.isSupported = new Promise(function (e) {
                        let t = new Image;
                        t.src = "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=", t.onload = t.onerror = function () {
                            e(1 === t.height)
                        }
                    })), this.isSupported
                }
            }
            class E {
                constructor(e) {
                    this.name = a.EXT_MESHOPT_COMPRESSION, this.parser = e
                }
                loadBufferView(e) {
                    let t = this.parser.json,
                        r = t.bufferViews[e];
                    if (!r.extensions || !r.extensions[this.name]) return null; {
                        let e = r.extensions[this.name],
                            s = this.parser.getDependency("buffer", e.buffer),
                            n = this.parser.options.meshoptDecoder;
                        if (!n || !n.supported) {
                            if (!(t.extensionsRequired && t.extensionsRequired.indexOf(this.name) >= 0)) return null;
                            throw Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files")
                        }
                        return s.then(function (t) {
                            let r = e.byteOffset || 0,
                                s = e.byteLength || 0,
                                i = e.count,
                                o = e.byteStride,
                                a = new Uint8Array(t, r, s);
                            return n.decodeGltfBufferAsync ? n.decodeGltfBufferAsync(i, o, a, e.mode, e.filter).then(function (e) {
                                return e.buffer
                            }) : n.ready.then(function () {
                                let t = new ArrayBuffer(i * o);
                                return n.decodeGltfBuffer(new Uint8Array(t), i, o, a, e.mode, e.filter), t
                            })
                        })
                    }
                }
            }
            class y {
                constructor(e) {
                    this.name = a.EXT_MESH_GPU_INSTANCING, this.parser = e
                }
                createNodeMesh(e) {
                    let t = this.parser.json,
                        r = t.nodes[e];
                    if (!r.extensions || !r.extensions[this.name] || void 0 === r.mesh) return null;
                    let n = t.meshes[r.mesh];
                    for (let e of n.primitives)
                        if (e.mode !== P.TRIANGLES && e.mode !== P.TRIANGLE_STRIP && e.mode !== P.TRIANGLE_FAN && void 0 !== e.mode) return null;
                    let i = r.extensions[this.name],
                        o = i.attributes,
                        a = [],
                        l = {};
                    for (let e in o) a.push(this.parser.getDependency("accessor", o[e]).then(t => (l[e] = t, l[e])));
                    return a.length < 1 ? null : (a.push(this.parser.createNodeMesh(e)), Promise.all(a).then(e => {
                        let t = e.pop(),
                            r = t.isGroup ? t.children : [t],
                            n = e[0].count,
                            i = [];
                        for (let e of r) {
                            let t = new s.yGw,
                                r = new s.Pa4,
                                o = new s._fP,
                                a = new s.Pa4(1, 1, 1),
                                u = new s.SPe(e.geometry, e.material, n);
                            for (let e = 0; e < n; e++) l.TRANSLATION && r.fromBufferAttribute(l.TRANSLATION, e), l.ROTATION && o.fromBufferAttribute(l.ROTATION, e), l.SCALE && a.fromBufferAttribute(l.SCALE, e), u.setMatrixAt(e, t.compose(r, o, a));
                            for (let t in l) "TRANSLATION" !== t && "ROTATION" !== t && "SCALE" !== t && e.geometry.setAttribute(t, l[t]);
                            s.Tme.prototype.copy.call(u, e), this.parser.assignFinalMaterial(u), i.push(u)
                        }
                        return t.isGroup ? (t.clear(), t.add(...i), t) : i[0]
                    }))
                }
            }
            let w = "glTF",
                v = {
                    JSON: 1313821514,
                    BIN: 5130562
                };
            class b {
                constructor(e) {
                    this.name = a.KHR_BINARY_GLTF, this.content = null, this.body = null;
                    let t = new DataView(e, 0, 12),
                        r = new TextDecoder;
                    if (this.header = {
                            magic: r.decode(new Uint8Array(e.slice(0, 4))),
                            version: t.getUint32(4, !0),
                            length: t.getUint32(8, !0)
                        }, this.header.magic !== w) throw Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");
                    if (this.header.version < 2) throw Error("THREE.GLTFLoader: Legacy binary file detected.");
                    let s = this.header.length - 12,
                        n = new DataView(e, 12),
                        i = 0;
                    for (; i < s;) {
                        let t = n.getUint32(i, !0);
                        i += 4;
                        let s = n.getUint32(i, !0);
                        if (i += 4, s === v.JSON) {
                            let s = new Uint8Array(e, 12 + i, t);
                            this.content = r.decode(s)
                        } else if (s === v.BIN) {
                            let r = 12 + i;
                            this.body = e.slice(r, r + t)
                        }
                        i += t
                    }
                    if (null === this.content) throw Error("THREE.GLTFLoader: JSON content not found.")
                }
            }
            class L {
                constructor(e, t) {
                    if (!t) throw Error("THREE.GLTFLoader: No DRACOLoader instance provided.");
                    this.name = a.KHR_DRACO_MESH_COMPRESSION, this.json = e, this.dracoLoader = t, this.dracoLoader.preload()
                }
                decodePrimitive(e, t) {
                    let r = this.json,
                        s = this.dracoLoader,
                        n = e.extensions[this.name].bufferView,
                        i = e.extensions[this.name].attributes,
                        o = {},
                        a = {},
                        l = {};
                    for (let e in i) {
                        let t = D[e] || e.toLowerCase();
                        o[t] = i[e]
                    }
                    for (let t in e.attributes) {
                        let s = D[t] || t.toLowerCase();
                        if (void 0 !== i[t]) {
                            let n = r.accessors[e.attributes[t]],
                                i = k[n.componentType];
                            l[s] = i.name, a[s] = !0 === n.normalized
                        }
                    }
                    return t.getDependency("bufferView", n).then(function (e) {
                        return new Promise(function (t) {
                            s.decodeDracoFile(e, function (e) {
                                for (let t in e.attributes) {
                                    let r = e.attributes[t],
                                        s = a[t];
                                    void 0 !== s && (r.normalized = s)
                                }
                                t(e)
                            }, o, l)
                        })
                    })
                }
            }
            class I {
                constructor() {
                    this.name = a.KHR_TEXTURE_TRANSFORM
                }
                extendTexture(e, t) {
                    return (void 0 === t.texCoord || t.texCoord === e.channel) && void 0 === t.offset && void 0 === t.rotation && void 0 === t.scale || (e = e.clone(), void 0 !== t.texCoord && (e.channel = t.texCoord), void 0 !== t.offset && e.offset.fromArray(t.offset), void 0 !== t.rotation && (e.rotation = t.rotation), void 0 !== t.scale && e.repeat.fromArray(t.scale), e.needsUpdate = !0), e
                }
            }
            class S {
                constructor() {
                    this.name = a.KHR_MESH_QUANTIZATION
                }
            }
            class M extends s._C8 {
                constructor(e, t, r, s) {
                    super(e, t, r, s)
                }
                copySampleValue_(e) {
                    let t = this.resultBuffer,
                        r = this.sampleValues,
                        s = this.valueSize,
                        n = e * s * 3 + s;
                    for (let e = 0; e !== s; e++) t[e] = r[n + e];
                    return t
                }
                interpolate_(e, t, r, s) {
                    let n = this.resultBuffer,
                        i = this.sampleValues,
                        o = this.valueSize,
                        a = 2 * o,
                        l = 3 * o,
                        u = s - t,
                        c = (r - t) / u,
                        h = c * c,
                        d = h * c,
                        p = e * l,
                        m = p - l,
                        f = -2 * d + 3 * h,
                        A = d - h,
                        g = 1 - f,
                        T = A - h + c;
                    for (let e = 0; e !== o; e++) {
                        let t = i[m + e + o],
                            r = i[m + e + a] * u,
                            s = i[p + e + o],
                            l = i[p + e] * u;
                        n[e] = g * t + T * r + f * s + A * l
                    }
                    return n
                }
            }
            let N = new s._fP;
            class C extends M {
                interpolate_(e, t, r, s) {
                    let n = super.interpolate_(e, t, r, s);
                    return N.fromArray(n).normalize().toArray(n), n
                }
            }
            let P = {
                    POINTS: 0,
                    LINES: 1,
                    LINE_LOOP: 2,
                    LINE_STRIP: 3,
                    TRIANGLES: 4,
                    TRIANGLE_STRIP: 5,
                    TRIANGLE_FAN: 6
                },
                k = {
                    5120: Int8Array,
                    5121: Uint8Array,
                    5122: Int16Array,
                    5123: Uint16Array,
                    5125: Uint32Array,
                    5126: Float32Array
                },
                O = {
                    9728: s.TyD,
                    9729: s.wem,
                    9984: s.YLQ,
                    9985: s.qyh,
                    9986: s.aH4,
                    9987: s.D1R
                },
                H = {
                    33071: s.uWy,
                    33648: s.OoA,
                    10497: s.rpg
                },
                U = {
                    SCALAR: 1,
                    VEC2: 2,
                    VEC3: 3,
                    VEC4: 4,
                    MAT2: 4,
                    MAT3: 9,
                    MAT4: 16
                },
                D = {
                    POSITION: "position",
                    NORMAL: "normal",
                    TANGENT: "tangent",
                    TEXCOORD_0: "uv",
                    TEXCOORD_1: "uv1",
                    TEXCOORD_2: "uv2",
                    TEXCOORD_3: "uv3",
                    COLOR_0: "color",
                    WEIGHTS_0: "skinWeight",
                    JOINTS_0: "skinIndex"
                },
                F = {
                    scale: "scale",
                    translation: "position",
                    rotation: "quaternion",
                    weights: "morphTargetInfluences"
                },
                G = {
                    CUBICSPLINE: void 0,
                    LINEAR: s.NMF,
                    STEP: s.Syv
                },
                B = {
                    OPAQUE: "OPAQUE",
                    MASK: "MASK",
                    BLEND: "BLEND"
                };

            function j(e, t, r) {
                for (let s in r.extensions) void 0 === e[s] && (t.userData.gltfExtensions = t.userData.gltfExtensions || {}, t.userData.gltfExtensions[s] = r.extensions[s])
            }

            function K(e, t) {
                void 0 !== t.extras && ("object" == typeof t.extras ? Object.assign(e.userData, t.extras) : console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, " + t.extras))
            }

            function V(e) {
                let t = "",
                    r = Object.keys(e).sort();
                for (let s = 0, n = r.length; s < n; s++) t += r[s] + ":" + e[r[s]] + ";";
                return t
            }

            function X(e) {
                switch (e) {
                    case Int8Array:
                        return 1 / 127;
                    case Uint8Array:
                        return 1 / 255;
                    case Int16Array:
                        return 1 / 32767;
                    case Uint16Array:
                        return 1 / 65535;
                    default:
                        throw Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")
                }
            }
            let q = new s.yGw;
            class W {
                constructor(e = {}, t = {}) {
                    this.json = e, this.extensions = {}, this.plugins = {}, this.options = t, this.cache = new o, this.associations = new Map, this.primitiveCache = {}, this.nodeCache = {}, this.meshCache = {
                        refs: {},
                        uses: {}
                    }, this.cameraCache = {
                        refs: {},
                        uses: {}
                    }, this.lightCache = {
                        refs: {},
                        uses: {}
                    }, this.sourceCache = {}, this.textureCache = {}, this.nodeNamesUsed = {};
                    let r = !1,
                        n = !1,
                        i = -1;
                    "undefined" != typeof navigator && (r = !0 === /^((?!chrome|android).)*safari/i.test(navigator.userAgent), i = (n = navigator.userAgent.indexOf("Firefox") > -1) ? navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1] : -1), "undefined" == typeof createImageBitmap || r || n && i < 98 ? this.textureLoader = new s.dpR(this.options.manager) : this.textureLoader = new s.QRU(this.options.manager), this.textureLoader.setCrossOrigin(this.options.crossOrigin), this.textureLoader.setRequestHeader(this.options.requestHeader), this.fileLoader = new s.hH6(this.options.manager), this.fileLoader.setResponseType("arraybuffer"), "use-credentials" === this.options.crossOrigin && this.fileLoader.setWithCredentials(!0)
                }
                setExtensions(e) {
                    this.extensions = e
                }
                setPlugins(e) {
                    this.plugins = e
                }
                parse(e, t) {
                    let r = this,
                        s = this.json,
                        n = this.extensions;
                    this.cache.removeAll(), this.nodeCache = {}, this._invokeAll(function (e) {
                        return e._markDefs && e._markDefs()
                    }), Promise.all(this._invokeAll(function (e) {
                        return e.beforeRoot && e.beforeRoot()
                    })).then(function () {
                        return Promise.all([r.getDependencies("scene"), r.getDependencies("animation"), r.getDependencies("camera")])
                    }).then(function (t) {
                        let i = {
                            scene: t[0][s.scene || 0],
                            scenes: t[0],
                            animations: t[1],
                            cameras: t[2],
                            asset: s.asset,
                            parser: r,
                            userData: {}
                        };
                        j(n, i, s), K(i, s), Promise.all(r._invokeAll(function (e) {
                            return e.afterRoot && e.afterRoot(i)
                        })).then(function () {
                            e(i)
                        })
                    }).catch(t)
                }
                _markDefs() {
                    let e = this.json.nodes || [],
                        t = this.json.skins || [],
                        r = this.json.meshes || [];
                    for (let r = 0, s = t.length; r < s; r++) {
                        let s = t[r].joints;
                        for (let t = 0, r = s.length; t < r; t++) e[s[t]].isBone = !0
                    }
                    for (let t = 0, s = e.length; t < s; t++) {
                        let s = e[t];
                        void 0 !== s.mesh && (this._addNodeRef(this.meshCache, s.mesh), void 0 !== s.skin && (r[s.mesh].isSkinnedMesh = !0)), void 0 !== s.camera && this._addNodeRef(this.cameraCache, s.camera)
                    }
                }
                _addNodeRef(e, t) {
                    void 0 !== t && (void 0 === e.refs[t] && (e.refs[t] = e.uses[t] = 0), e.refs[t]++)
                }
                _getNodeRef(e, t, r) {
                    if (e.refs[t] <= 1) return r;
                    let s = r.clone(),
                        n = (e, t) => {
                            let r = this.associations.get(e);
                            for (let [s, i] of (null != r && this.associations.set(t, r), e.children.entries())) n(i, t.children[s])
                        };
                    return n(r, s), s.name += "_instance_" + e.uses[t]++, s
                }
                _invokeOne(e) {
                    let t = Object.values(this.plugins);
                    t.push(this);
                    for (let r = 0; r < t.length; r++) {
                        let s = e(t[r]);
                        if (s) return s
                    }
                    return null
                }
                _invokeAll(e) {
                    let t = Object.values(this.plugins);
                    t.unshift(this);
                    let r = [];
                    for (let s = 0; s < t.length; s++) {
                        let n = e(t[s]);
                        n && r.push(n)
                    }
                    return r
                }
                getDependency(e, t) {
                    let r = e + ":" + t,
                        s = this.cache.get(r);
                    if (!s) {
                        switch (e) {
                            case "scene":
                                s = this.loadScene(t);
                                break;
                            case "node":
                                s = this._invokeOne(function (e) {
                                    return e.loadNode && e.loadNode(t)
                                });
                                break;
                            case "mesh":
                                s = this._invokeOne(function (e) {
                                    return e.loadMesh && e.loadMesh(t)
                                });
                                break;
                            case "accessor":
                                s = this.loadAccessor(t);
                                break;
                            case "bufferView":
                                s = this._invokeOne(function (e) {
                                    return e.loadBufferView && e.loadBufferView(t)
                                });
                                break;
                            case "buffer":
                                s = this.loadBuffer(t);
                                break;
                            case "material":
                                s = this._invokeOne(function (e) {
                                    return e.loadMaterial && e.loadMaterial(t)
                                });
                                break;
                            case "texture":
                                s = this._invokeOne(function (e) {
                                    return e.loadTexture && e.loadTexture(t)
                                });
                                break;
                            case "skin":
                                s = this.loadSkin(t);
                                break;
                            case "animation":
                                s = this._invokeOne(function (e) {
                                    return e.loadAnimation && e.loadAnimation(t)
                                });
                                break;
                            case "camera":
                                s = this.loadCamera(t);
                                break;
                            default:
                                if (!(s = this._invokeOne(function (r) {
                                        return r != this && r.getDependency && r.getDependency(e, t)
                                    }))) throw Error("Unknown type: " + e)
                        }
                        this.cache.add(r, s)
                    }
                    return s
                }
                getDependencies(e) {
                    let t = this.cache.get(e);
                    if (!t) {
                        let r = this,
                            s = this.json[e + ("mesh" === e ? "es" : "s")] || [];
                        t = Promise.all(s.map(function (t, s) {
                            return r.getDependency(e, s)
                        })), this.cache.add(e, t)
                    }
                    return t
                }
                loadBuffer(e) {
                    let t = this.json.buffers[e],
                        r = this.fileLoader;
                    if (t.type && "arraybuffer" !== t.type) throw Error("THREE.GLTFLoader: " + t.type + " buffer type is not supported.");
                    if (void 0 === t.uri && 0 === e) return Promise.resolve(this.extensions[a.KHR_BINARY_GLTF].body);
                    let n = this.options;
                    return new Promise(function (e, i) {
                        r.load(s.Zp0.resolveURL(t.uri, n.path), e, void 0, function () {
                            i(Error('THREE.GLTFLoader: Failed to load buffer "' + t.uri + '".'))
                        })
                    })
                }
                loadBufferView(e) {
                    let t = this.json.bufferViews[e];
                    return this.getDependency("buffer", t.buffer).then(function (e) {
                        let r = t.byteLength || 0,
                            s = t.byteOffset || 0;
                        return e.slice(s, s + r)
                    })
                }
                loadAccessor(e) {
                    let t = this,
                        r = this.json,
                        n = this.json.accessors[e];
                    if (void 0 === n.bufferView && void 0 === n.sparse) {
                        let e = U[n.type],
                            t = k[n.componentType],
                            r = !0 === n.normalized,
                            i = new t(n.count * e);
                        return Promise.resolve(new s.TlE(i, e, r))
                    }
                    let i = [];
                    return void 0 !== n.bufferView ? i.push(this.getDependency("bufferView", n.bufferView)) : i.push(null), void 0 !== n.sparse && (i.push(this.getDependency("bufferView", n.sparse.indices.bufferView)), i.push(this.getDependency("bufferView", n.sparse.values.bufferView))), Promise.all(i).then(function (e) {
                        let i, o;
                        let a = e[0],
                            l = U[n.type],
                            u = k[n.componentType],
                            c = u.BYTES_PER_ELEMENT,
                            h = c * l,
                            d = n.byteOffset || 0,
                            p = void 0 !== n.bufferView ? r.bufferViews[n.bufferView].byteStride : void 0,
                            m = !0 === n.normalized;
                        if (p && p !== h) {
                            let e = Math.floor(d / p),
                                r = "InterleavedBuffer:" + n.bufferView + ":" + n.componentType + ":" + e + ":" + n.count,
                                h = t.cache.get(r);
                            h || (i = new u(a, e * p, n.count * p / c), h = new s.vpT(i, p / c), t.cache.add(r, h)), o = new s.kB5(h, l, d % p / c, m)
                        } else i = null === a ? new u(n.count * l) : new u(a, d, n.count * l), o = new s.TlE(i, l, m);
                        if (void 0 !== n.sparse) {
                            let t = U.SCALAR,
                                r = k[n.sparse.indices.componentType],
                                i = n.sparse.indices.byteOffset || 0,
                                c = n.sparse.values.byteOffset || 0,
                                h = new r(e[1], i, n.sparse.count * t),
                                d = new u(e[2], c, n.sparse.count * l);
                            null !== a && (o = new s.TlE(o.array.slice(), o.itemSize, o.normalized));
                            for (let e = 0, t = h.length; e < t; e++) {
                                let t = h[e];
                                if (o.setX(t, d[e * l]), l >= 2 && o.setY(t, d[e * l + 1]), l >= 3 && o.setZ(t, d[e * l + 2]), l >= 4 && o.setW(t, d[e * l + 3]), l >= 5) throw Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")
                            }
                        }
                        return o
                    })
                }
                loadTexture(e) {
                    let t = this.json,
                        r = this.options,
                        s = t.textures[e],
                        n = s.source,
                        i = t.images[n],
                        o = this.textureLoader;
                    if (i.uri) {
                        let e = r.manager.getHandler(i.uri);
                        null !== e && (o = e)
                    }
                    return this.loadTextureImage(e, n, o)
                }
                loadTextureImage(e, t, r) {
                    let n = this,
                        i = this.json,
                        o = i.textures[e],
                        a = i.images[t],
                        l = (a.uri || a.bufferView) + ":" + o.sampler;
                    if (this.textureCache[l]) return this.textureCache[l];
                    let u = this.loadImageSource(t, r).then(function (t) {
                        t.flipY = !1, t.name = o.name || a.name || "", "" === t.name && "string" == typeof a.uri && !1 === a.uri.startsWith("data:image/") && (t.name = a.uri);
                        let r = i.samplers || {},
                            l = r[o.sampler] || {};
                        return t.magFilter = O[l.magFilter] || s.wem, t.minFilter = O[l.minFilter] || s.D1R, t.wrapS = H[l.wrapS] || s.rpg, t.wrapT = H[l.wrapT] || s.rpg, n.associations.set(t, {
                            textures: e
                        }), t
                    }).catch(function () {
                        return null
                    });
                    return this.textureCache[l] = u, u
                }
                loadImageSource(e, t) {
                    let r = this.json,
                        n = this.options;
                    if (void 0 !== this.sourceCache[e]) return this.sourceCache[e].then(e => e.clone());
                    let i = r.images[e],
                        o = self.URL || self.webkitURL,
                        a = i.uri || "",
                        l = !1;
                    if (void 0 !== i.bufferView) a = this.getDependency("bufferView", i.bufferView).then(function (e) {
                        l = !0;
                        let t = new Blob([e], {
                            type: i.mimeType
                        });
                        return a = o.createObjectURL(t)
                    });
                    else if (void 0 === i.uri) throw Error("THREE.GLTFLoader: Image " + e + " is missing URI and bufferView");
                    let u = Promise.resolve(a).then(function (e) {
                        return new Promise(function (r, i) {
                            let o = r;
                            !0 === t.isImageBitmapLoader && (o = function (e) {
                                let t = new s.xEZ(e);
                                t.needsUpdate = !0, r(t)
                            }), t.load(s.Zp0.resolveURL(e, n.path), o, void 0, i)
                        })
                    }).then(function (e) {
                        var t;
                        return !0 === l && o.revokeObjectURL(a), e.userData.mimeType = i.mimeType || ((t = i.uri).search(/\.jpe?g($|\?)/i) > 0 || 0 === t.search(/^data\:image\/jpeg/) ? "image/jpeg" : t.search(/\.webp($|\?)/i) > 0 || 0 === t.search(/^data\:image\/webp/) ? "image/webp" : "image/png"), e
                    }).catch(function (e) {
                        throw console.error("THREE.GLTFLoader: Couldn't load texture", a), e
                    });
                    return this.sourceCache[e] = u, u
                }
                assignTexture(e, t, r, s) {
                    let n = this;
                    return this.getDependency("texture", r.index).then(function (i) {
                        if (!i) return null;
                        if (void 0 !== r.texCoord && r.texCoord > 0 && ((i = i.clone()).channel = r.texCoord), n.extensions[a.KHR_TEXTURE_TRANSFORM]) {
                            let e = void 0 !== r.extensions ? r.extensions[a.KHR_TEXTURE_TRANSFORM] : void 0;
                            if (e) {
                                let t = n.associations.get(i);
                                i = n.extensions[a.KHR_TEXTURE_TRANSFORM].extendTexture(i, e), n.associations.set(i, t)
                            }
                        }
                        return void 0 !== s && (i.colorSpace = s), e[t] = i, i
                    })
                }
                assignFinalMaterial(e) {
                    let t = e.geometry,
                        r = e.material,
                        n = void 0 === t.attributes.tangent,
                        i = void 0 !== t.attributes.color,
                        o = void 0 === t.attributes.normal;
                    if (e.isPoints) {
                        let e = "PointsMaterial:" + r.uuid,
                            t = this.cache.get(e);
                        t || (t = new s.UY4, s.F5T.prototype.copy.call(t, r), t.color.copy(r.color), t.map = r.map, t.sizeAttenuation = !1, this.cache.add(e, t)), r = t
                    } else if (e.isLine) {
                        let e = "LineBasicMaterial:" + r.uuid,
                            t = this.cache.get(e);
                        t || (t = new s.nls, s.F5T.prototype.copy.call(t, r), t.color.copy(r.color), t.map = r.map, this.cache.add(e, t)), r = t
                    }
                    if (n || i || o) {
                        let e = "ClonedMaterial:" + r.uuid + ":";
                        n && (e += "derivative-tangents:"), i && (e += "vertex-colors:"), o && (e += "flat-shading:");
                        let t = this.cache.get(e);
                        t || (t = r.clone(), i && (t.vertexColors = !0), o && (t.flatShading = !0), n && (t.normalScale && (t.normalScale.y *= -1), t.clearcoatNormalScale && (t.clearcoatNormalScale.y *= -1)), this.cache.add(e, t), this.associations.set(t, this.associations.get(r))), r = t
                    }
                    e.material = r
                }
                getMaterialType() {
                    return s.Wid
                }
                loadMaterial(e) {
                    let t;
                    let r = this,
                        n = this.json,
                        i = this.extensions,
                        o = n.materials[e],
                        l = {},
                        u = o.extensions || {},
                        c = [];
                    if (u[a.KHR_MATERIALS_UNLIT]) {
                        let e = i[a.KHR_MATERIALS_UNLIT];
                        t = e.getMaterialType(), c.push(e.extendParams(l, o, r))
                    } else {
                        let n = o.pbrMetallicRoughness || {};
                        if (l.color = new s.Ilk(1, 1, 1), l.opacity = 1, Array.isArray(n.baseColorFactor)) {
                            let e = n.baseColorFactor;
                            l.color.setRGB(e[0], e[1], e[2], s.GUF), l.opacity = e[3]
                        }
                        void 0 !== n.baseColorTexture && c.push(r.assignTexture(l, "map", n.baseColorTexture, s.KI_)), l.metalness = void 0 !== n.metallicFactor ? n.metallicFactor : 1, l.roughness = void 0 !== n.roughnessFactor ? n.roughnessFactor : 1, void 0 !== n.metallicRoughnessTexture && (c.push(r.assignTexture(l, "metalnessMap", n.metallicRoughnessTexture)), c.push(r.assignTexture(l, "roughnessMap", n.metallicRoughnessTexture))), t = this._invokeOne(function (t) {
                            return t.getMaterialType && t.getMaterialType(e)
                        }), c.push(Promise.all(this._invokeAll(function (t) {
                            return t.extendMaterialParams && t.extendMaterialParams(e, l)
                        })))
                    }!0 === o.doubleSided && (l.side = s.ehD);
                    let h = o.alphaMode || B.OPAQUE;
                    if (h === B.BLEND ? (l.transparent = !0, l.depthWrite = !1) : (l.transparent = !1, h === B.MASK && (l.alphaTest = void 0 !== o.alphaCutoff ? o.alphaCutoff : .5)), void 0 !== o.normalTexture && t !== s.vBJ && (c.push(r.assignTexture(l, "normalMap", o.normalTexture)), l.normalScale = new s.FM8(1, 1), void 0 !== o.normalTexture.scale)) {
                        let e = o.normalTexture.scale;
                        l.normalScale.set(e, e)
                    }
                    if (void 0 !== o.occlusionTexture && t !== s.vBJ && (c.push(r.assignTexture(l, "aoMap", o.occlusionTexture)), void 0 !== o.occlusionTexture.strength && (l.aoMapIntensity = o.occlusionTexture.strength)), void 0 !== o.emissiveFactor && t !== s.vBJ) {
                        let e = o.emissiveFactor;
                        l.emissive = new s.Ilk().setRGB(e[0], e[1], e[2], s.GUF)
                    }
                    return void 0 !== o.emissiveTexture && t !== s.vBJ && c.push(r.assignTexture(l, "emissiveMap", o.emissiveTexture, s.KI_)), Promise.all(c).then(function () {
                        let s = new t(l);
                        return o.name && (s.name = o.name), K(s, o), r.associations.set(s, {
                            materials: e
                        }), o.extensions && j(i, s, o), s
                    })
                }
                createUniqueName(e) {
                    let t = s.iUV.sanitizeNodeName(e || "");
                    return t in this.nodeNamesUsed ? t + "_" + ++this.nodeNamesUsed[t] : (this.nodeNamesUsed[t] = 0, t)
                }
                loadGeometries(e) {
                    let t = this,
                        r = this.extensions,
                        n = this.primitiveCache,
                        i = [];
                    for (let o = 0, l = e.length; o < l; o++) {
                        let l = e[o],
                            u = function (e) {
                                let t;
                                let r = e.extensions && e.extensions[a.KHR_DRACO_MESH_COMPRESSION];
                                if (t = r ? "draco:" + r.bufferView + ":" + r.indices + ":" + V(r.attributes) : e.indices + ":" + V(e.attributes) + ":" + e.mode, void 0 !== e.targets)
                                    for (let r = 0, s = e.targets.length; r < s; r++) t += ":" + V(e.targets[r]);
                                return t
                            }(l),
                            c = n[u];
                        if (c) i.push(c.promise);
                        else {
                            let e;
                            e = l.extensions && l.extensions[a.KHR_DRACO_MESH_COMPRESSION] ? function (e) {
                                return r[a.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(e, t).then(function (r) {
                                    return z(r, e, t)
                                })
                            }(l) : z(new s.u9r, l, t), n[u] = {
                                primitive: l,
                                promise: e
                            }, i.push(e)
                        }
                    }
                    return Promise.all(i)
                }
                loadMesh(e) {
                    let t = this,
                        r = this.json,
                        i = this.extensions,
                        o = r.meshes[e],
                        a = o.primitives,
                        l = [];
                    for (let e = 0, t = a.length; e < t; e++) {
                        var u;
                        let t = void 0 === a[e].material ? (void 0 === (u = this.cache).DefaultMaterial && (u.DefaultMaterial = new s.Wid({
                            color: 16777215,
                            emissive: 0,
                            metalness: 1,
                            roughness: 1,
                            transparent: !1,
                            depthTest: !0,
                            side: s.Wl3
                        })), u.DefaultMaterial) : this.getDependency("material", a[e].material);
                        l.push(t)
                    }
                    return l.push(t.loadGeometries(a)), Promise.all(l).then(function (r) {
                        let l = r.slice(0, r.length - 1),
                            u = r[r.length - 1],
                            c = [];
                        for (let r = 0, h = u.length; r < h; r++) {
                            let h;
                            let d = u[r],
                                p = a[r],
                                m = l[r];
                            if (p.mode === P.TRIANGLES || p.mode === P.TRIANGLE_STRIP || p.mode === P.TRIANGLE_FAN || void 0 === p.mode) !0 === (h = !0 === o.isSkinnedMesh ? new s.TUv(d, m) : new s.Kj0(d, m)).isSkinnedMesh && h.normalizeSkinWeights(), p.mode === P.TRIANGLE_STRIP ? h.geometry = n(h.geometry, s.UlW) : p.mode === P.TRIANGLE_FAN && (h.geometry = n(h.geometry, s.z$h));
                            else if (p.mode === P.LINES) h = new s.ejS(d, m);
                            else if (p.mode === P.LINE_STRIP) h = new s.x12(d, m);
                            else if (p.mode === P.LINE_LOOP) h = new s.blk(d, m);
                            else if (p.mode === P.POINTS) h = new s.woe(d, m);
                            else throw Error("THREE.GLTFLoader: Primitive mode unsupported: " + p.mode);
                            Object.keys(h.geometry.morphAttributes).length > 0 && function (e, t) {
                                if (e.updateMorphTargets(), void 0 !== t.weights)
                                    for (let r = 0, s = t.weights.length; r < s; r++) e.morphTargetInfluences[r] = t.weights[r];
                                if (t.extras && Array.isArray(t.extras.targetNames)) {
                                    let r = t.extras.targetNames;
                                    if (e.morphTargetInfluences.length === r.length) {
                                        e.morphTargetDictionary = {};
                                        for (let t = 0, s = r.length; t < s; t++) e.morphTargetDictionary[r[t]] = t
                                    } else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")
                                }
                            }(h, o), h.name = t.createUniqueName(o.name || "mesh_" + e), K(h, o), p.extensions && j(i, h, p), t.assignFinalMaterial(h), c.push(h)
                        }
                        for (let r = 0, s = c.length; r < s; r++) t.associations.set(c[r], {
                            meshes: e,
                            primitives: r
                        });
                        if (1 === c.length) return o.extensions && j(i, c[0], o), c[0];
                        let h = new s.ZAu;
                        o.extensions && j(i, h, o), t.associations.set(h, {
                            meshes: e
                        });
                        for (let e = 0, t = c.length; e < t; e++) h.add(c[e]);
                        return h
                    })
                }
                loadCamera(e) {
                    let t;
                    let r = this.json.cameras[e],
                        n = r[r.type];
                    if (!n) {
                        console.warn("THREE.GLTFLoader: Missing camera parameters.");
                        return
                    }
                    return "perspective" === r.type ? t = new s.cPb(s.M8C.radToDeg(n.yfov), n.aspectRatio || 1, n.znear || 1, n.zfar || 2e6) : "orthographic" === r.type && (t = new s.iKG(-n.xmag, n.xmag, n.ymag, -n.ymag, n.znear, n.zfar)), r.name && (t.name = this.createUniqueName(r.name)), K(t, r), Promise.resolve(t)
                }
                loadSkin(e) {
                    let t = this.json.skins[e],
                        r = [];
                    for (let e = 0, s = t.joints.length; e < s; e++) r.push(this._loadNodeShallow(t.joints[e]));
                    return void 0 !== t.inverseBindMatrices ? r.push(this.getDependency("accessor", t.inverseBindMatrices)) : r.push(null), Promise.all(r).then(function (e) {
                        let r = e.pop(),
                            n = [],
                            i = [];
                        for (let o = 0, a = e.length; o < a; o++) {
                            let a = e[o];
                            if (a) {
                                n.push(a);
                                let e = new s.yGw;
                                null !== r && e.fromArray(r.array, 16 * o), i.push(e)
                            } else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.', t.joints[o])
                        }
                        return new s.OdW(n, i)
                    })
                }
                loadAnimation(e) {
                    let t = this.json,
                        r = this,
                        n = t.animations[e],
                        i = n.name ? n.name : "animation_" + e,
                        o = [],
                        a = [],
                        l = [],
                        u = [],
                        c = [];
                    for (let e = 0, t = n.channels.length; e < t; e++) {
                        let t = n.channels[e],
                            r = n.samplers[t.sampler],
                            s = t.target,
                            i = s.node,
                            h = void 0 !== n.parameters ? n.parameters[r.input] : r.input,
                            d = void 0 !== n.parameters ? n.parameters[r.output] : r.output;
                        void 0 !== s.node && (o.push(this.getDependency("node", i)), a.push(this.getDependency("accessor", h)), l.push(this.getDependency("accessor", d)), u.push(r), c.push(s))
                    }
                    return Promise.all([Promise.all(o), Promise.all(a), Promise.all(l), Promise.all(u), Promise.all(c)]).then(function (e) {
                        let t = e[0],
                            n = e[1],
                            o = e[2],
                            a = e[3],
                            l = e[4],
                            u = [];
                        for (let e = 0, s = t.length; e < s; e++) {
                            let s = t[e],
                                i = n[e],
                                c = o[e],
                                h = a[e],
                                d = l[e];
                            if (void 0 === s) continue;
                            s.updateMatrix && s.updateMatrix();
                            let p = r._createAnimationTracks(s, i, c, h, d);
                            if (p)
                                for (let e = 0; e < p.length; e++) u.push(p[e])
                        }
                        return new s.m7l(i, void 0, u)
                    })
                }
                createNodeMesh(e) {
                    let t = this.json,
                        r = this,
                        s = t.nodes[e];
                    return void 0 === s.mesh ? null : r.getDependency("mesh", s.mesh).then(function (e) {
                        let t = r._getNodeRef(r.meshCache, s.mesh, e);
                        return void 0 !== s.weights && t.traverse(function (e) {
                            if (e.isMesh)
                                for (let t = 0, r = s.weights.length; t < r; t++) e.morphTargetInfluences[t] = s.weights[t]
                        }), t
                    })
                }
                loadNode(e) {
                    let t = this.json,
                        r = t.nodes[e],
                        s = this._loadNodeShallow(e),
                        n = [],
                        i = r.children || [];
                    for (let e = 0, t = i.length; e < t; e++) n.push(this.getDependency("node", i[e]));
                    let o = void 0 === r.skin ? Promise.resolve(null) : this.getDependency("skin", r.skin);
                    return Promise.all([s, Promise.all(n), o]).then(function (e) {
                        let t = e[0],
                            r = e[1],
                            s = e[2];
                        null !== s && t.traverse(function (e) {
                            e.isSkinnedMesh && e.bind(s, q)
                        });
                        for (let e = 0, s = r.length; e < s; e++) t.add(r[e]);
                        return t
                    })
                }
                _loadNodeShallow(e) {
                    let t = this.json,
                        r = this.extensions,
                        n = this;
                    if (void 0 !== this.nodeCache[e]) return this.nodeCache[e];
                    let i = t.nodes[e],
                        o = i.name ? n.createUniqueName(i.name) : "",
                        a = [],
                        l = n._invokeOne(function (t) {
                            return t.createNodeMesh && t.createNodeMesh(e)
                        });
                    return l && a.push(l), void 0 !== i.camera && a.push(n.getDependency("camera", i.camera).then(function (e) {
                        return n._getNodeRef(n.cameraCache, i.camera, e)
                    })), n._invokeAll(function (t) {
                        return t.createNodeAttachment && t.createNodeAttachment(e)
                    }).forEach(function (e) {
                        a.push(e)
                    }), this.nodeCache[e] = Promise.all(a).then(function (t) {
                        let a;
                        if ((a = !0 === i.isBone ? new s.N$j : t.length > 1 ? new s.ZAu : 1 === t.length ? t[0] : new s.Tme) !== t[0])
                            for (let e = 0, r = t.length; e < r; e++) a.add(t[e]);
                        if (i.name && (a.userData.name = i.name, a.name = o), K(a, i), i.extensions && j(r, a, i), void 0 !== i.matrix) {
                            let e = new s.yGw;
                            e.fromArray(i.matrix), a.applyMatrix4(e)
                        } else void 0 !== i.translation && a.position.fromArray(i.translation), void 0 !== i.rotation && a.quaternion.fromArray(i.rotation), void 0 !== i.scale && a.scale.fromArray(i.scale);
                        return n.associations.has(a) || n.associations.set(a, {}), n.associations.get(a).nodes = e, a
                    }), this.nodeCache[e]
                }
                loadScene(e) {
                    let t = this.extensions,
                        r = this.json.scenes[e],
                        n = this,
                        i = new s.ZAu;
                    r.name && (i.name = n.createUniqueName(r.name)), K(i, r), r.extensions && j(t, i, r);
                    let o = r.nodes || [],
                        a = [];
                    for (let e = 0, t = o.length; e < t; e++) a.push(n.getDependency("node", o[e]));
                    return Promise.all(a).then(function (e) {
                        for (let t = 0, r = e.length; t < r; t++) i.add(e[t]);
                        return n.associations = (e => {
                            let t = new Map;
                            for (let [e, r] of n.associations)(e instanceof s.F5T || e instanceof s.xEZ) && t.set(e, r);
                            return e.traverse(e => {
                                let r = n.associations.get(e);
                                null != r && t.set(e, r)
                            }), t
                        })(i), i
                    })
                }
                _createAnimationTracks(e, t, r, n, i) {
                    let o;
                    let a = [],
                        l = e.name ? e.name : e.uuid,
                        u = [];
                    switch (F[i.path] === F.weights ? e.traverse(function (e) {
                        e.morphTargetInfluences && u.push(e.name ? e.name : e.uuid)
                    }) : u.push(l), F[i.path]) {
                        case F.weights:
                            o = s.dUE;
                            break;
                        case F.rotation:
                            o = s.iLg;
                            break;
                        case F.position:
                        case F.scale:
                            o = s.yC1;
                            break;
                        default:
                            o = 1 === r.itemSize ? s.dUE : s.yC1
                    }
                    let c = void 0 !== n.interpolation ? G[n.interpolation] : s.NMF,
                        h = this._getArrayFromAccessor(r);
                    for (let e = 0, r = u.length; e < r; e++) {
                        let r = new o(u[e] + "." + F[i.path], t.array, h, c);
                        "CUBICSPLINE" === n.interpolation && this._createCubicSplineTrackInterpolant(r), a.push(r)
                    }
                    return a
                }
                _getArrayFromAccessor(e) {
                    let t = e.array;
                    if (e.normalized) {
                        let e = X(t.constructor),
                            r = new Float32Array(t.length);
                        for (let s = 0, n = t.length; s < n; s++) r[s] = t[s] * e;
                        t = r
                    }
                    return t
                }
                _createCubicSplineTrackInterpolant(e) {
                    e.createInterpolant = function (e) {
                        let t = this instanceof s.iLg ? C : M;
                        return new t(this.times, this.values, this.getValueSize() / 3, e)
                    }, e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = !0
                }
            }

            function z(e, t, r) {
                let n = t.attributes,
                    i = [];
                for (let t in n) {
                    let s = D[t] || t.toLowerCase();
                    s in e.attributes || i.push(function (t, s) {
                        return r.getDependency("accessor", t).then(function (t) {
                            e.setAttribute(s, t)
                        })
                    }(n[t], s))
                }
                if (void 0 !== t.indices && !e.index) {
                    let s = r.getDependency("accessor", t.indices).then(function (t) {
                        e.setIndex(t)
                    });
                    i.push(s)
                }
                return s.epp.workingColorSpace !== s.GUF && "COLOR_0" in n && console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${s.epp.workingColorSpace}" not supported.`), K(e, t), ! function (e, t, r) {
                    let n = t.attributes,
                        i = new s.ZzF;
                    if (void 0 === n.POSITION) return; {
                        let e = r.json.accessors[n.POSITION],
                            t = e.min,
                            o = e.max;
                        if (void 0 !== t && void 0 !== o) {
                            if (i.set(new s.Pa4(t[0], t[1], t[2]), new s.Pa4(o[0], o[1], o[2])), e.normalized) {
                                let t = X(k[e.componentType]);
                                i.min.multiplyScalar(t), i.max.multiplyScalar(t)
                            }
                        } else {
                            console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
                            return
                        }
                    }
                    let o = t.targets;
                    if (void 0 !== o) {
                        let e = new s.Pa4,
                            t = new s.Pa4;
                        for (let s = 0, n = o.length; s < n; s++) {
                            let n = o[s];
                            if (void 0 !== n.POSITION) {
                                let s = r.json.accessors[n.POSITION],
                                    i = s.min,
                                    o = s.max;
                                if (void 0 !== i && void 0 !== o) {
                                    if (t.setX(Math.max(Math.abs(i[0]), Math.abs(o[0]))), t.setY(Math.max(Math.abs(i[1]), Math.abs(o[1]))), t.setZ(Math.max(Math.abs(i[2]), Math.abs(o[2]))), s.normalized) {
                                        let e = X(k[s.componentType]);
                                        t.multiplyScalar(e)
                                    }
                                    e.max(t)
                                } else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")
                            }
                        }
                        i.expandByVector(e)
                    }
                    e.boundingBox = i;
                    let a = new s.aLr;
                    i.getCenter(a.center), a.radius = i.min.distanceTo(i.max) / 2, e.boundingSphere = a
                }(e, t, r), Promise.all(i).then(function () {
                    return void 0 !== t.targets ? function (e, t, r) {
                        let s = !1,
                            n = !1,
                            i = !1;
                        for (let e = 0, r = t.length; e < r; e++) {
                            let r = t[e];
                            if (void 0 !== r.POSITION && (s = !0), void 0 !== r.NORMAL && (n = !0), void 0 !== r.COLOR_0 && (i = !0), s && n && i) break
                        }
                        if (!s && !n && !i) return Promise.resolve(e);
                        let o = [],
                            a = [],
                            l = [];
                        for (let u = 0, c = t.length; u < c; u++) {
                            let c = t[u];
                            if (s) {
                                let t = void 0 !== c.POSITION ? r.getDependency("accessor", c.POSITION) : e.attributes.position;
                                o.push(t)
                            }
                            if (n) {
                                let t = void 0 !== c.NORMAL ? r.getDependency("accessor", c.NORMAL) : e.attributes.normal;
                                a.push(t)
                            }
                            if (i) {
                                let t = void 0 !== c.COLOR_0 ? r.getDependency("accessor", c.COLOR_0) : e.attributes.color;
                                l.push(t)
                            }
                        }
                        return Promise.all([Promise.all(o), Promise.all(a), Promise.all(l)]).then(function (t) {
                            let r = t[0],
                                o = t[1],
                                a = t[2];
                            return s && (e.morphAttributes.position = r), n && (e.morphAttributes.normal = o), i && (e.morphAttributes.color = a), e.morphTargetsRelative = !0, e
                        })
                    }(e, t.targets, r) : e
                })
            }
        }
    }
]);