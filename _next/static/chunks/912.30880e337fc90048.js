"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [912], {
        2182: function (e, t, i) {
            i.d(t, {
                D: function () {
                    return n
                }
            });
            let n = function () {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 100;
                return new Promise(t => {
                    setTimeout(t, e)
                })
            }
        },
        6455: function (e, t, i) {
            var n, s;
            i.d(t, {
                e: function () {
                    return n
                }
            }), (s = n || (n = {})).Magenta = "#9552D8", s.Green = "#ADFF00", s.LightGrey = "#757575", s.DarkGrey = "#232323", s.MapDroneTrail = "#2a2a2a", s.MapAsciiBackground = "#373737", s.MapRoutersTop = "#C15CE5", s.MapRoutersMiddle = "#924FDC", s.MapRoutersBottom = "#5217BB", s.MapRoutersOutside = "#6f42c8", s.MapDistrictFill = "#373737", s.MapDistrictOutsideFill = "#262626", s.MapOutsideBg = "#373737", s.MapWater = "#2a2a2a"
        },
        4552: function (e, t, i) {
            i.d(t, {
                Z: function () {
                    return c
                },
                h: function () {
                    return s
                }
            });
            var n, s, a = i(9477),
                o = i(6090),
                r = i(8174),
                l = i(2001);
            (n = s || (s = {})).Image = "image", n.Video = "video", n.Model = "model", n.PointCloud = "pointcloud";
            class c {
                applySettingsFromJSON(e) {
                    Object.keys(e).forEach(t => {
                        void 0 !== this.defaultSettings[t] && (this.settings[t] = e[t])
                    }), this.isActive = this.settings.display, this.applySettings(), this.parseChannels();
                    for (let e = 0; e < 4; e++) this.channelsTimelines[e].time(-1), this.channelsTimelines[e].time(.01)
                }
                setMask(e) {}
                async setSource(e) {}
                setSourceTextureAspect(e) {}
                update(e, t) {}
                getSettingsDiff() {
                    let e = {};
                    return Object.keys(this.settings).forEach(t => {
                        JSON.stringify(this.settings[t]) !== JSON.stringify(this.defaultSettings[t]) && (e[t] = this.settings[t])
                    }), e
                }
                getAllSettingsKeys() {
                    return Object.keys(this.defaultSettings)
                }
                createUI() {
                    this.resetSettings(), this.isDebug && (this.settingsFolder.on("change", () => {
                        this.applySettings()
                    }), this.settingsFolder.addBinding(this.settings, "solo").on("change", () => {
                        this.settings.solo && this.settingsUI.onSettingsSolo.invoke(this.settingsType)
                    }))
                }
                parseChannels() {
                    this.channelsTimelines.forEach(e => e.clear());
                    for (let e = 1; e < 5; e++) {
                        if (void 0 === this.settings["channel" + e] || "" === this.settings["channel" + e]) continue;
                        let t = this.settings["channel" + e].replaceAll(" ", "").split(",");
                        "" !== t[0] && t.forEach(t => {
                            let i = t.split(":");
                            if (i[0].includes(".")) {
                                let t = i[0].split("."),
                                    n = t[0],
                                    s = t[1],
                                    a = i[1].split(">"),
                                    o = a.length,
                                    r = 1 / o;
                                a.forEach((t, i) => {
                                    void 0 !== this.settings[n] && (0 === i ? this.channelsTimelines[e - 1].to(this.settings[n], {
                                        [s]: t,
                                        duration: 0
                                    }, 0) : this.channelsTimelines[e - 1].to(this.settings[n], {
                                        [s]: t,
                                        duration: r
                                    }, (i - 1) * r))
                                })
                            } else {
                                let t = i[0],
                                    n = i[1].split(">"),
                                    s = n.length,
                                    a = 1 / (s - 1);
                                n.forEach((i, n) => {
                                    void 0 !== this.settings[t] && (0 === n ? this.channelsTimelines[e - 1].to(this.settings, {
                                        [t]: i,
                                        duration: 0
                                    }, 0) : this.channelsTimelines[e - 1].to(this.settings, {
                                        [t]: i,
                                        duration: a
                                    }, (n - 1) * a))
                                })
                            }
                        })
                    }
                }
                updateChannelTimeline(e, t) {
                    this.channelsTimelines[e].time(0), this.channelsTimelines[e].time(Math.floor(25 * t) / 25 + .01)
                }
                getAssetType(e) {
                    return e.includes("png") || e.includes("jpg") ? s.Image : e.includes("mp4") ? s.Video : e.includes("glb") ? s.Model : e.includes("ply") ? s.PointCloud : void 0
                }
                destroy() {
                    this.settingsUI.onSettingsReset.remove(this.resetSettings), this.settingsUI.onSettingsUpdated.removeAll(), this.settingsUI.onSettingsSolo.remove(this.handleSettingsSolo), this.settingsFolder && (this.settingsFolder.children.forEach(e => {
                        e.dispose()
                    }), this.settingsFolder.dispose())
                }
                resize(e) {}
                constructor(e = {
                    name: "No name",
                    settingsType: o.a.None
                }) {
                    this.name = "", this.settingsType = o.a.None, this.isActive = !1, this.group = new a.ZAu, this.lookAtCamera = !1, this.settings = {}, this.channelsTimelines = [], this.applySettings = () => {}, this.resetSettings = () => {
                        let e = JSON.parse(JSON.stringify(this.defaultSettings));
                        this.isActive = !1, this.settings.channel1 = "", this.settings.channel2 = "", this.settings.channel3 = "", this.settings.channel4 = "", this.settings = Object.assign(this.settings, e), this.parseChannels(), this.applySettings()
                    }, this.handleSettingsSolo = e => {
                        this.settingsType === e ? (this.settingsFolder.title = "SOLO: " + this.name, this.settings.display = !0, this.settings.displayOverride = !0) : (this.settingsFolder.title = this.name, this.settings.displayOverride = !1, this.settings.solo = !1, this.settingsFolder.refresh()), this.applySettings()
                    }, this.assetManager = new r.default().assetManager, this.settingsUI = new o.Z, this.name = e.name, this.settingsType = e.settingsType, this.channelsTimelines = [];
                    for (let e = 0; e < 4; e++) this.channelsTimelines.push(l.ZP.timeline({
                        paused: !0,
                        duration: 1,
                        onUpdate: () => {
                            this.applySettings()
                        }
                    }));
                    let t = new r.default;
                    this.isDebug = t.debug.isActive, this.isDebug && (this.settingsFolder = t.debug.pane.addFolder({
                        title: this.name,
                        expanded: !1
                    })), this.settingsUI.onSettingsReset.add(this.resetSettings), this.settingsUI.onSettingsSolo.add(this.handleSettingsSolo), this.settingsUI.onSettingsUpdated.add(e => {
                        e.type === this.settingsType && this.applySettingsFromJSON(e.settings)
                    })
                }
            }
        },
        3912: function (e, t, i) {
            i.r(t), i.d(t, {
                ASSETS_PATH: function () {
                    return Y
                },
                IMAGES_FOLDER: function () {
                    return L
                },
                MODELS_PATH: function () {
                    return B
                },
                VIDEOS_FOLDER: function () {
                    return j
                },
                default: function () {
                    return G
                }
            });
            var n, s, a = i(1322),
                o = i(9477),
                r = function (e, t) {
                    void 0 === t && console.warn('THREE.OrbitControls: The second parameter "domElement" is now mandatory.'), t === document && console.error('THREE.OrbitControls: "document" should not be used as the target "domElement". Please use "renderer.domElement" instead.'), this.object = e, this.domElement = t, this.enabled = !0, this.target = new o.Pa4, this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = .05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.minPan = new o.Pa4(-2, -2, -2), this.maxPan = new o.Pa4(2, 2, 2), this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !1, this.keyPanSpeed = 7, this.autoRotate = !1, this.autoRotateSpeed = 2, this.enableKeys = !0, this.keys = {
                        LEFT: 37,
                        UP: 38,
                        RIGHT: 39,
                        BOTTOM: 40
                    }, this.mouseButtons = {
                        LEFT: o.RsA.ROTATE,
                        MIDDLE: o.RsA.DOLLY,
                        RIGHT: o.RsA.PAN
                    }, this.touches = {
                        ONE: o.QmN.ROTATE,
                        TWO: o.QmN.DOLLY_PAN
                    }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this.dollyIn = N, this.dollyOut = _, this.velocity = 0, this.isControlling = function () {
                        return d.enabled && v === p.PAN || v === p.ROTATE
                    }, this.getPolarAngle = function () {
                        return x.phi
                    }, this.getAzimuthalAngle = function () {
                        return x.theta
                    }, this.saveState = function () {
                        d.target0.copy(d.target), d.position0.copy(d.object.position), d.zoom0 = d.object.zoom
                    }, this.reset = function () {
                        d.target.copy(d.target0), d.object.position.copy(d.position0), d.object.zoom = d.zoom0, d.object.updateProjectionMatrix(), d.dispatchEvent(u), d.update(), v = p.NONE
                    }, this.update = (i = new o.Pa4, s = (n = new o._fP().setFromUnitVectors(e.up, new o.Pa4(0, 1, 0))).clone().invert(), a = new o.Pa4, r = new o._fP, function () {
                        var e = d.object.position;
                        return i.copy(e).sub(d.target), i.applyQuaternion(n), x.setFromVector3(i), d.autoRotate && v === p.NONE && D(2 * Math.PI / 60 / 60 * d.autoRotateSpeed), d.enableDamping ? (x.theta += y.theta * d.dampingFactor, x.phi += y.phi * d.dampingFactor) : (x.theta += y.theta, x.phi += y.phi), x.theta = Math.max(d.minAzimuthAngle, Math.min(d.maxAzimuthAngle, x.theta)), x.phi = Math.max(d.minPolarAngle, Math.min(d.maxPolarAngle, x.phi)), x.makeSafe(), x.radius *= b, x.radius = Math.max(d.minDistance, Math.min(d.maxDistance, x.radius)), !0 === d.enableDamping ? d.target.addScaledVector(S, d.dampingFactor) : d.target.add(S), d.target.clamp(d.minPan, d.maxPan), i.setFromSpherical(x), i.applyQuaternion(s), e.copy(d.target).add(i), d.object.lookAt(d.target), !0 === d.enableDamping ? (y.theta *= 1 - d.dampingFactor, y.phi *= 1 - d.dampingFactor, S.multiplyScalar(1 - d.dampingFactor)) : (y.set(0, 0, 0), S.set(0, 0, 0)), b = 1, this.velocity = a.distanceTo(d.object.position), !!(P || a.distanceToSquared(d.object.position) > f || 8 * (1 - r.dot(d.object.quaternion)) > f) && (d.dispatchEvent(u), a.copy(d.object.position), r.copy(d.object.quaternion), P = !1, !0)
                    }), this.dispose = function () {
                        d.domElement.removeEventListener("contextmenu", et, !1), d.domElement.removeEventListener("mousedown", q, !1), d.domElement.removeEventListener("wheel", K, !1), d.domElement.removeEventListener("touchstart", Q, !1), d.domElement.removeEventListener("touchend", ee, !1), d.domElement.removeEventListener("touchmove", $, !1), document.removeEventListener("mousemove", V, !1), document.removeEventListener("mouseup", H, !1), d.domElement.removeEventListener("keydown", J, !1)
                    };
                    var i, n, s, a, r, l, c, h, d = this,
                        u = {
                            type: "change"
                        },
                        m = {
                            type: "start"
                        },
                        g = {
                            type: "end"
                        },
                        p = {
                            NONE: -1,
                            ROTATE: 0,
                            DOLLY: 1,
                            PAN: 2,
                            TOUCH_ROTATE: 3,
                            TOUCH_PAN: 4,
                            TOUCH_DOLLY_PAN: 5,
                            TOUCH_DOLLY_ROTATE: 6
                        },
                        v = p.NONE,
                        f = 1e-6,
                        x = new o.$V,
                        y = new o.$V,
                        b = 1,
                        S = new o.Pa4,
                        P = !1,
                        w = new o.FM8,
                        M = new o.FM8,
                        A = new o.FM8,
                        C = new o.FM8,
                        T = new o.FM8,
                        F = new o.FM8,
                        E = new o.FM8,
                        z = new o.FM8,
                        U = new o.FM8;

                    function O() {
                        return Math.pow(.95, d.zoomSpeed)
                    }

                    function D(e) {
                        y.theta -= e
                    }
                    var I = (l = new o.Pa4, function (e, t) {
                            l.setFromMatrixColumn(t, 0), l.multiplyScalar(-e), S.add(l)
                        }),
                        k = (c = new o.Pa4, function (e, t) {
                            !0 === d.screenSpacePanning ? c.setFromMatrixColumn(t, 1) : (c.setFromMatrixColumn(t, 0), c.crossVectors(d.object.up, c)), c.multiplyScalar(e), S.add(c)
                        }),
                        R = (h = new o.Pa4, function (e, t) {
                            var i = d.domElement;
                            if (d.object.isPerspectiveCamera) {
                                var n = d.object.position;
                                h.copy(n).sub(d.target);
                                var s = h.length();
                                I(2 * e * (s *= Math.tan(d.object.fov / 2 * Math.PI / 180)) / i.clientHeight, d.object.matrix), k(2 * t * s / i.clientHeight, d.object.matrix)
                            } else d.object.isOrthographicCamera ? (I(e * (d.object.right - d.object.left) / d.object.zoom / i.clientWidth, d.object.matrix), k(t * (d.object.top - d.object.bottom) / d.object.zoom / i.clientHeight, d.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), d.enablePan = !1)
                        });

                    function N(e) {
                        d.object.isPerspectiveCamera ? b /= e : d.object.isOrthographicCamera ? (d.object.zoom = Math.max(d.minZoom, Math.min(d.maxZoom, d.object.zoom * e)), d.object.updateProjectionMatrix(), P = !0) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), d.enableZoom = !1)
                    }

                    function _(e) {
                        d.object.isPerspectiveCamera ? b *= e : d.object.isOrthographicCamera ? (d.object.zoom = Math.max(d.minZoom, Math.min(d.maxZoom, d.object.zoom / e)), d.object.updateProjectionMatrix(), P = !0) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), d.enableZoom = !1)
                    }

                    function B(e) {
                        w.set(e.clientX, e.clientY)
                    }

                    function L(e) {
                        C.set(e.clientX, e.clientY)
                    }

                    function j(e) {
                        if (1 === e.touches.length) w.set(e.touches[0].pageX, e.touches[0].pageY);
                        else {
                            var t = .5 * (e.touches[0].pageX + e.touches[1].pageX),
                                i = .5 * (e.touches[0].pageY + e.touches[1].pageY);
                            w.set(t, i)
                        }
                    }

                    function Y(e) {
                        if (1 === e.touches.length) C.set(e.touches[0].pageX, e.touches[0].pageY);
                        else {
                            var t = .5 * (e.touches[0].pageX + e.touches[1].pageX),
                                i = .5 * (e.touches[0].pageY + e.touches[1].pageY);
                            C.set(t, i)
                        }
                    }

                    function X(e) {
                        var t = e.touches[0].pageX - e.touches[1].pageX,
                            i = e.touches[0].pageY - e.touches[1].pageY;
                        E.set(0, Math.sqrt(t * t + i * i))
                    }

                    function Z(e) {
                        if (1 === e.touches.length) M.set(e.touches[0].pageX, e.touches[0].pageY);
                        else {
                            var t, i = .5 * (e.touches[0].pageX + e.touches[1].pageX),
                                n = .5 * (e.touches[0].pageY + e.touches[1].pageY);
                            M.set(i, n)
                        }
                        A.subVectors(M, w).multiplyScalar(d.rotateSpeed);
                        var s = d.domElement;
                        D(2 * Math.PI * A.x / s.clientHeight), t = 2 * Math.PI * A.y / s.clientHeight, y.phi -= t, w.copy(M)
                    }

                    function G(e) {
                        if (1 === e.touches.length) T.set(e.touches[0].pageX, e.touches[0].pageY);
                        else {
                            var t = .5 * (e.touches[0].pageX + e.touches[1].pageX),
                                i = .5 * (e.touches[0].pageY + e.touches[1].pageY);
                            T.set(t, i)
                        }
                        F.subVectors(T, C).multiplyScalar(d.panSpeed), R(F.x, F.y), C.copy(T)
                    }

                    function W(e) {
                        var t = e.touches[0].pageX - e.touches[1].pageX,
                            i = e.touches[0].pageY - e.touches[1].pageY;
                        z.set(0, Math.sqrt(t * t + i * i)), U.set(0, Math.pow(z.y / E.y, d.zoomSpeed)), N(U.y), E.copy(z)
                    }

                    function q(e) {
                        if (!1 !== d.enabled) {
                            switch (e.preventDefault(), d.domElement.focus ? d.domElement.focus() : window.focus(), e.button) {
                                case 0:
                                    switch (d.mouseButtons.LEFT) {
                                        case o.RsA.ROTATE:
                                            if (e.ctrlKey || e.metaKey || e.shiftKey) {
                                                if (!1 === d.enablePan) return;
                                                L(e), v = p.PAN
                                            } else {
                                                if (!1 === d.enableRotate) return;
                                                B(e), v = p.ROTATE
                                            }
                                            break;
                                        case o.RsA.PAN:
                                            if (e.ctrlKey || e.metaKey || e.shiftKey) {
                                                if (!1 === d.enableRotate) return;
                                                B(e), v = p.ROTATE
                                            } else {
                                                if (!1 === d.enablePan) return;
                                                L(e), v = p.PAN
                                            }
                                            break;
                                        default:
                                            v = p.NONE
                                    }
                                    break;
                                case 1:
                                    if (d.mouseButtons.MIDDLE === o.RsA.DOLLY) {
                                        if (!1 === d.enableZoom) return;
                                        E.set(e.clientX, e.clientY), v = p.DOLLY
                                    } else v = p.NONE;
                                    break;
                                case 2:
                                    switch (d.mouseButtons.RIGHT) {
                                        case o.RsA.ROTATE:
                                            if (!1 === d.enableRotate) return;
                                            B(e), v = p.ROTATE;
                                            break;
                                        case o.RsA.PAN:
                                            if (!1 === d.enablePan) return;
                                            L(e), v = p.PAN;
                                            break;
                                        default:
                                            v = p.NONE
                                    }
                            }
                            v !== p.NONE && (document.addEventListener("mousemove", V, !1), document.addEventListener("mouseup", H, !1), d.dispatchEvent(m))
                        }
                    }

                    function V(e) {
                        var t, i;
                        if (!1 !== d.enabled) switch (e.preventDefault(), v) {
                            case p.ROTATE:
                                if (!1 === d.enableRotate) return;
                                M.set(e.clientX, e.clientY), A.subVectors(M, w).multiplyScalar(d.rotateSpeed), t = d.domElement, D(2 * Math.PI * A.x / t.clientHeight), i = 2 * Math.PI * A.y / t.clientHeight, y.phi -= i, w.copy(M), d.update();
                                break;
                            case p.DOLLY:
                                if (!1 === d.enableZoom) return;
                                z.set(e.clientX, e.clientY), U.subVectors(z, E), U.y > 0 ? N(O()) : U.y < 0 && _(O()), E.copy(z), d.update();
                                break;
                            case p.PAN:
                                if (!1 === d.enablePan) return;
                                T.set(e.clientX, e.clientY), F.subVectors(T, C).multiplyScalar(d.panSpeed), R(F.x, F.y), C.copy(T), d.update()
                        }
                    }

                    function H(e) {
                        !1 !== d.enabled && (document.removeEventListener("mousemove", V, !1), document.removeEventListener("mouseup", H, !1), d.dispatchEvent(g), v = p.NONE)
                    }

                    function K(e) {
                        !1 !== d.enabled && !1 !== d.enableZoom && (v === p.NONE || v === p.ROTATE) && (e.preventDefault(), e.stopPropagation(), d.dispatchEvent(m), e.deltaY < 0 ? _(O()) : e.deltaY > 0 && N(O()), d.update(), d.dispatchEvent(g))
                    }

                    function J(e) {
                        !1 !== d.enabled && !1 !== d.enableKeys && !1 !== d.enablePan && function (e) {
                            var t = !1;
                            switch (e.keyCode) {
                                case d.keys.UP:
                                    R(0, d.keyPanSpeed), t = !0;
                                    break;
                                case d.keys.BOTTOM:
                                    R(0, -d.keyPanSpeed), t = !0;
                                    break;
                                case d.keys.LEFT:
                                    R(d.keyPanSpeed, 0), t = !0;
                                    break;
                                case d.keys.RIGHT:
                                    R(-d.keyPanSpeed, 0), t = !0
                            }
                            t && (e.preventDefault(), d.update())
                        }(e)
                    }

                    function Q(e) {
                        if (!1 !== d.enabled) {
                            switch (e.preventDefault(), e.touches.length) {
                                case 1:
                                    switch (d.touches.ONE) {
                                        case o.QmN.ROTATE:
                                            if (!1 === d.enableRotate) return;
                                            j(e), v = p.TOUCH_ROTATE;
                                            break;
                                        case o.QmN.PAN:
                                            if (!1 === d.enablePan) return;
                                            Y(e), v = p.TOUCH_PAN;
                                            break;
                                        default:
                                            v = p.NONE
                                    }
                                    break;
                                case 2:
                                    switch (d.touches.TWO) {
                                        case o.QmN.DOLLY_PAN:
                                            if (!1 === d.enableZoom && !1 === d.enablePan) return;
                                            d.enableZoom && X(e), d.enablePan && Y(e), v = p.TOUCH_DOLLY_PAN;
                                            break;
                                        case o.QmN.DOLLY_ROTATE:
                                            if (!1 === d.enableZoom && !1 === d.enableRotate) return;
                                            d.enableZoom && X(e), d.enableRotate && j(e), v = p.TOUCH_DOLLY_ROTATE;
                                            break;
                                        default:
                                            v = p.NONE
                                    }
                                    break;
                                default:
                                    v = p.NONE
                            }
                            v !== p.NONE && d.dispatchEvent(m)
                        }
                    }

                    function $(e) {
                        if (!1 !== d.enabled) switch (e.preventDefault(), e.stopPropagation(), v) {
                            case p.TOUCH_ROTATE:
                                if (!1 === d.enableRotate) return;
                                Z(e), d.update();
                                break;
                            case p.TOUCH_PAN:
                                if (!1 === d.enablePan) return;
                                G(e), d.update();
                                break;
                            case p.TOUCH_DOLLY_PAN:
                                if (!1 === d.enableZoom && !1 === d.enablePan) return;
                                d.enableZoom && W(e), d.enablePan && G(e), d.update();
                                break;
                            case p.TOUCH_DOLLY_ROTATE:
                                if (!1 === d.enableZoom && !1 === d.enableRotate) return;
                                d.enableZoom && W(e), d.enableRotate && Z(e), d.update();
                                break;
                            default:
                                v = p.NONE
                        }
                    }

                    function ee(e) {
                        !1 !== d.enabled && (d.dispatchEvent(g), v = p.NONE)
                    }

                    function et(e) {
                        !1 !== d.enabled && e.preventDefault()
                    }
                    d.domElement.addEventListener("contextmenu", et, !1), d.domElement.addEventListener("mousedown", q, !1), d.domElement.addEventListener("wheel", K, !1), d.domElement.addEventListener("touchstart", Q, !1), d.domElement.addEventListener("touchend", ee, !1), d.domElement.addEventListener("touchmove", $, !1), d.domElement.addEventListener("keydown", J, !1), -1 === d.domElement.tabIndex && (d.domElement.tabIndex = 0), this.update()
                };
            r.prototype = Object.create(o.pBf.prototype), r.prototype.constructor = r;
            var l = function (e, t) {
                r.call(this, e, t), this.touches.TWO = o.QmN.DOLLY_PAN
            };
            l.prototype = Object.create(o.pBf.prototype), l.prototype.constructor = l;
            var c = i(4210),
                h = i(4458),
                d = i(7531);
            let u = window.innerWidth,
                m = window.innerHeight,
                g = {
                    uniforms: {
                        tDiffuse: {
                            type: "t",
                            value: 0,
                            texture: null
                        },
                        tAscii: {
                            type: "t",
                            value: 0,
                            texture: null
                        },
                        posterizeGamma: {
                            value: .3
                        },
                        posterizeColors: {
                            value: 21
                        },
                        asciiAmount: {
                            value: 0
                        },
                        asciiUvSize: {
                            value: 1
                        },
                        resolution: {
                            value: new o.FM8(u, m)
                        },
                        time: {
                            value: 0
                        },
                        verticalPixelSmudgeAmount: {
                            value: 0
                        },
                        verticalPixelSmudgeStepUp: {
                            value: 200
                        },
                        verticalPixelSmudgeStepDown: {
                            value: 1e3
                        },
                        horisontalPixelSmudgeAmount: {
                            value: 0
                        },
                        invertAmount: {
                            value: 0
                        },
                        globalStrength: {
                            value: 0
                        },
                        hsvCorrection: {
                            value: new o.Pa4(1, 1, 1)
                        },
                        scrollAmount: {
                            value: 0
                        }
                    },
                    vertexShader: "\n    varying vec2 vUv;\n    //varying vec2 screenPosition;\n\n    void main() {\n\n      vUv = vec2( uv.x, uv.y );\n      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n    }\n  ",
                    fragmentShader: "\n    precision highp float;\n\n    uniform sampler2D tDiffuse;\n    uniform sampler2D tAscii;\n    uniform float asciiAmount;\n    uniform float asciiUvSize;\n    uniform float posterizeColors;\n    uniform float posterizeGamma;\n    uniform float time;\n    uniform float globalStrength;\n    uniform float verticalPixelSmudgeAmount;\n    uniform float verticalPixelSmudgeStepUp;\n    uniform float verticalPixelSmudgeStepDown;\n    uniform float horisontalPixelSmudgeAmount;\n    uniform vec2 resolution;\n    varying vec2 vUv;\n    uniform vec3 hsvCorrection;\n    uniform float invertAmount;\n    uniform float scrollAmount;\n\n\n    vec4 posterize(vec4 inputColor){\n      float gamma = posterizeGamma;\n      float numColors = max(1.0,posterizeColors);\n\n      vec3 c = inputColor.rgb;\n      c = pow(c, vec3(gamma, gamma, gamma));\n      c = c * numColors;\n      c = floor(c);\n      c = c / numColors;\n      c = pow(c, vec3(1.0/gamma));\n\n      return vec4(c, inputColor.a);\n    }\n\n    vec3 rgb2hsv(vec3 c)\n    {\n        vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);\n        vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));\n        vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));\n\n        float d = q.x - min(q.w, q.y);\n        float e = 1.0e-10;\n        return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);\n    }\n\n    vec3 hsv2rgb(vec3 c)\n    {\n        vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);\n        vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);\n        return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);\n    }\n\n    float random(vec2 c){\n      return fract(sin(dot(c.xy ,vec2(12.9898,78.233))) * 43758.5453);\n    }\n\n    vec3 mod289(vec3 x) {\n      return x - floor(x * (1.0 / 289.0)) * 289.0;\n    }\n\n    vec4 mod289(vec4 x) {\n      return x - floor(x * (1.0 / 289.0)) * 289.0;\n    }\n\n    vec4 permute(vec4 x) {\n          return mod289(((x*34.0)+1.0)*x);\n    }\n\n    vec4 taylorInvSqrt(vec4 r)\n    {\n      return 1.79284291400159 - 0.85373472095314 * r;\n    }\n\n    float snoise3(vec3 v)\n      {\n      const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\n      const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);\n\n    // First corner\n      vec3 i  = floor(v + dot(v, C.yyy) );\n      vec3 x0 =   v - i + dot(i, C.xxx) ;\n\n    // Other corners\n      vec3 g = step(x0.yzx, x0.xyz);\n      vec3 l = 1.0 - g;\n      vec3 i1 = min( g.xyz, l.zxy );\n      vec3 i2 = max( g.xyz, l.zxy );\n\n      //   x0 = x0 - 0.0 + 0.0 * C.xxx;\n      //   x1 = x0 - i1  + 1.0 * C.xxx;\n      //   x2 = x0 - i2  + 2.0 * C.xxx;\n      //   x3 = x0 - 1.0 + 3.0 * C.xxx;\n      vec3 x1 = x0 - i1 + C.xxx;\n      vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y\n      vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y\n\n    // Permutations\n      i = mod289(i);\n      vec4 p = permute( permute( permute(\n                  i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\n                + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))\n                + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n\n    // Gradients: 7x7 points over a square, mapped onto an octahedron.\n    // The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)\n      float n_ = 0.142857142857; // 1.0/7.0\n      vec3  ns = n_ * D.wyz - D.xzx;\n\n      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)\n\n      vec4 x_ = floor(j * ns.z);\n      vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)\n\n      vec4 x = x_ *ns.x + ns.yyyy;\n      vec4 y = y_ *ns.x + ns.yyyy;\n      vec4 h = 1.0 - abs(x) - abs(y);\n\n      vec4 b0 = vec4( x.xy, y.xy );\n      vec4 b1 = vec4( x.zw, y.zw );\n\n      //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;\n      //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;\n      vec4 s0 = floor(b0)*2.0 + 1.0;\n      vec4 s1 = floor(b1)*2.0 + 1.0;\n      vec4 sh = -step(h, vec4(0.0));\n\n      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\n      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;\n\n      vec3 p0 = vec3(a0.xy,h.x);\n      vec3 p1 = vec3(a0.zw,h.y);\n      vec3 p2 = vec3(a1.xy,h.z);\n      vec3 p3 = vec3(a1.zw,h.w);\n\n    //Normalise gradients\n      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n      p0 *= norm.x;\n      p1 *= norm.y;\n      p2 *= norm.z;\n      p3 *= norm.w;\n\n    // Mix final noise value\n      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n      m = m * m;\n      return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),\n                                    dot(p2,x2), dot(p3,x3) ) );\n      }\n\n    void main() {\n      float strength = globalStrength;\n\n      vec2 scaledUv = vUv;\n\n      vec3 originalColor = texture2D(tDiffuse, vUv).rgb;\n\n      scaledUv = vUv;\n\n      //Shuffle\n      float shuffleAmount = 1.0;\n      float tileSizeBase = asciiUvSize;\n      float gridSizeX = floor(resolution.x/tileSizeBase);\n      float gridSizeY = floor(resolution.y/tileSizeBase);\n\n      float positionInTileX = mod(scaledUv.x,1.0 / gridSizeX);\n      float positionInTileY = mod(scaledUv.y,1.0 / gridSizeY);\n\n      float tileX = floor(scaledUv.x * gridSizeX);\n      float tileY = floor(scaledUv.y * gridSizeY);\n\n      float rnd = random(vec2(tileX+time*0.0001,tileY));\n      float offsetTileX = floor( mod(rnd,1.0) * 2.0);\n      float offsetTileY = floor( mod(rnd,1.0) * 2.0);\n\n      //keep in center\n      offsetTileX *= 1.0 - 2.0 * step(0.5, mod(random(vec2(tileX,tileY)),1.0));\n      offsetTileY *= 1.0 - 2.0 * step(0.5, mod(random(vec2(tileX,tileY)),1.0));\n\n      float shuffledX = (tileX + offsetTileX)/gridSizeX + positionInTileX;\n      float shuffledY = (tileY + offsetTileY)/gridSizeY + positionInTileY;\n\n      vec2 shuffledUv = mix(vUv,vec2(shuffledX, shuffledY), shuffleAmount);\n\n      //too much?\n      float colorDistance = 1.0-smoothstep(0.0,0.3,distance(vec3(0.4,0.0,0.4), originalColor));\n      scaledUv.y *= 1.0+colorDistance*0.1;\n\n      vec4 asciiTexel = texture2D(tAscii,shuffledUv*vec2(gridSizeX/16.0,gridSizeY/16.0));\n\n      vec2 distortedUv = vUv;\n      distortedUv.y += random(vec2(floor(vUv.x*verticalPixelSmudgeStepUp)/verticalPixelSmudgeStepUp,0.0)) * 0.1 * verticalPixelSmudgeAmount * globalStrength * (originalColor.r+0.3);\n      distortedUv.y -= random(vec2(floor(vUv.x*verticalPixelSmudgeStepDown)/verticalPixelSmudgeStepDown,0.0)) * 0.1 * verticalPixelSmudgeAmount * globalStrength * (originalColor.b+0.3);\n\n      distortedUv.x += random(vec2(vUv.y,0.0)) * 0.1 * horisontalPixelSmudgeAmount * globalStrength * originalColor.r;\n      distortedUv.x -= random(vec2(floor(vUv.y*100.0)/100.0,0.0)) * 0.1 * horisontalPixelSmudgeAmount * globalStrength * originalColor.b;\n\n      //shuffledUv.y += random(vec2(floor(vUv.x * verticalPixelSmudgeStepUp)/verticalPixelSmudgeStepUp,0.0));\n\n      //extra effect while rotating camera\n      //distortedUv.y += random(vec2(floor(vUv.x * verticalPixelSmudgeStepUp)/verticalPixelSmudgeStepUp,0.0))*scrollAmount*0.05;\n\n      vec4 texel = mix(texture2D( tDiffuse, distortedUv), texture2D( tDiffuse, shuffledUv) , asciiAmount * step(0.8,(asciiTexel.r+asciiTexel.g+asciiTexel.b)*0.33));\n\n      gl_FragColor = LinearTosRGB(texel);\n      gl_FragColor = posterize(gl_FragColor);\n      gl_FragColor.a = 1.0;\n\n      //color correction\n      //vec3 fragHSV = rgb2hsv(gl_FragColor.rgb);\n      //fragHSV.xyz *= hsvCorrection.xyz;\n      //gl_FragColor.rgb = hsv2rgb(fragHSV);\n\n      gl_FragColor.rgb = mix(gl_FragColor.rgb,1.0-gl_FragColor.rgb, invertAmount);\n\n      float density = 2.0;\n      vec2 sl = vec2(sin(vUv.x * resolution.x * density), cos(vUv.y * resolution.y * density * 0.5 + fract(time*0.6)*3.14));\n	    float scanlines = step(0.8, sl.y) + step(0.8, sl.x);\n      gl_FragColor.rgb -= scanlines*0.05;\n    }\n  "
                };
            var p = i(6090),
                v = i(8174),
                f = i(2001),
                x = i(4770),
                y = i(6635);
            class b {
                applySettingsFromJSON(e) {
                    Object.keys(e).forEach(t => {
                        void 0 !== this.defaultSettings[t] && (this.settings[t] = e[t])
                    }), this.applySettings(this.settings), this.parseChannels()
                }
                reduceColorsToZero() {
                    return new Promise(e => {
                        f.ZP.fromTo(this.overrideSettings, {
                            posterizeColors: this.settings.posterizeColors,
                            posterizeGamma: this.settings.posterizeGamma
                        }, {
                            duration: .5,
                            posterizeColors: 0,
                            posterizeGamma: 0,
                            onComplete: () => {
                                e()
                            },
                            onUpdate: () => {
                                this.applySettings(this.overrideSettings)
                            }
                        })
                    })
                }
                fromZeroColors() {
                    return this.blockIncomingChannels = !0, new Promise(e => {
                        f.ZP.fromTo(this.overrideSettings, {
                            posterizeColors: 0,
                            posterizeGamma: 0,
                            verticalPixelSmudgeAmount: 11,
                            verticalPixelSmudgeStepUp: 40,
                            verticalPixelSmudgeStepDown: 20
                        }, {
                            duration: 1,
                            posterizeColors: this.settings.posterizeColors,
                            posterizeGamma: this.settings.posterizeGamma,
                            verticalPixelSmudgeAmount: this.settings.verticalPixelSmudgeAmount,
                            verticalPixelSmudgeStepUp: this.settings.verticalPixelSmudgeStepUp,
                            verticalPixelSmudgeStepDown: this.settings.verticalPixelSmudgeStepDown,
                            ease: x.Yv.easeIn,
                            onComplete: () => {
                                this.blockIncomingChannels = !1, [0, 1, 2, 3].forEach(e => {
                                    this.updateChannelTimeline(e, this.currentChannelAmount[e])
                                }), e()
                            },
                            onUpdate: () => {
                                this.applySettings(this.overrideSettings)
                            }
                        })
                    })
                }
                getSettingsDiff() {
                    let e = {};
                    return Object.keys(this.settings).forEach(t => {
                        JSON.stringify(this.settings[t]) !== JSON.stringify(this.defaultSettings[t]) && (e[t] = this.settings[t])
                    }), e
                }
                createUI() {
                    let e = new v.default;
                    e.debug.isActive && (this.settingsFolder = this.settingsUI.pane.addFolder({
                        title: "Post FX",
                        expanded: !1
                    }), this.settingsFolder.on("change", () => {
                        this.applySettings(this.settings)
                    }), this.settingsFolder.addBinding(this.settings, "verticalPixelSmudgeAmount", {
                        min: 0,
                        max: 120
                    }), this.settingsFolder.addBinding(this.settings, "verticalPixelSmudgeStepUp", {
                        min: 10,
                        max: 2e3
                    }), this.settingsFolder.addBinding(this.settings, "verticalPixelSmudgeStepDown", {
                        min: 10,
                        max: 2e3
                    }), this.settingsFolder.addBinding(this.settings, "horisontalPixelSmudgeAmount", {
                        min: 0,
                        max: 120
                    }), this.settingsFolder.addBinding(this.settings, "asciiAmount", {
                        min: 0,
                        max: 1
                    }), this.settingsFolder.addBinding(this.settings, "asciiUvSize", {
                        min: 6,
                        max: 50,
                        step: 1
                    }), this.settingsFolder.addBinding(this.settings, "posterizeColors", {
                        min: 0,
                        max: 255,
                        step: 1
                    }), this.settingsFolder.addBinding(this.settings, "posterizeGamma", {
                        min: 0,
                        max: 1
                    }), this.settingsFolder.addBinding(this.settings, "hsvCorrection", {
                        min: 0,
                        max: 2
                    }))
                }
                updateChannelTimeline(e, t) {
                    this.blockIncomingChannels || (this.channelsTimelines[e].time(0), this.channelsTimelines[e].time(Math.floor(15 * t) / 15 + .01), this.applySettings(this.settings), this.currentChannelAmount[e] = t)
                }
                setSceneAndCamera(e, t) {
                    this.scene = e, this.camera = t, this.renderPass.camera = t, this.renderPass.scene = e
                }
                setProgress(e) {
                    this.compositingPass.uniforms.globalStrength.value = e
                }
                applySettings(e) {
                    this.compositingPass.uniforms.globalStrength.value = this.settingsUI.shared.globalStrength, this.compositingPass.uniforms.verticalPixelSmudgeAmount.value = e.verticalPixelSmudgeAmount, this.compositingPass.uniforms.verticalPixelSmudgeStepUp.value = e.verticalPixelSmudgeStepUp, this.compositingPass.uniforms.verticalPixelSmudgeStepDown.value = e.verticalPixelSmudgeStepDown, this.compositingPass.uniforms.horisontalPixelSmudgeAmount.value = e.horisontalPixelSmudgeAmount, this.compositingPass.uniforms.asciiAmount.value = e.asciiAmount, this.compositingPass.uniforms.asciiUvSize.value = e.asciiUvSize, this.compositingPass.uniforms.posterizeColors.value = e.posterizeColors, this.compositingPass.uniforms.posterizeGamma.value = e.posterizeGamma, this.compositingPass.uniforms.hsvCorrection.value.copy(e.hsvCorrection), this.compositingPass.uniforms.invertAmount.value = e.invertAmount
                }
                reset() {}
                render(e, t) {
                    this.compositingPass.uniforms.time.value = e, this.isDecryptionMode && (this.compositingPass.uniforms.verticalPixelSmudgeStepUp.value = 20, this.compositingPass.uniforms.verticalPixelSmudgeStepDown.value = 10, this.compositingPass.uniforms.posterizeColors.value = 48 - 20 * this.extraGlitch, this.compositingPass.uniforms.verticalPixelSmudgeAmount.value = 20 * this.extraGlitch), this.genericComposer.render(t), this.renderer.setRenderTarget(null)
                }
                setMask(e) {}
                resize(e, t) {
                    this.genericComposer.setSize(e, t), this.compositingPass.uniforms.resolution.value.set(e, t)
                }
                startDecryptionMode() {
                    this.isDecryptionMode = !0, this.startGlitchTimeline()
                }
                endDecryptionMode() {
                    this.isDecryptionMode = !1, this.glitchTimeline && this.glitchTimeline.kill()
                }
                startGlitchTimeline() {
                    this.glitchTimeline = f.ZP.timeline({
                        duration: 7,
                        repeat: -1
                    }), this.glitchTimeline.to(this, {
                        extraGlitch: 1,
                        duration: 0
                    }, 2), this.glitchTimeline.to(this, {
                        extraGlitch: 0,
                        duration: .02
                    }, 2.15), this.glitchTimeline.to(this, {
                        extraGlitch: .5,
                        duration: 0
                    }, 4), this.glitchTimeline.to(this, {
                        extraGlitch: 0,
                        duration: .02
                    }, 4.15)
                }
                setScrollAmount(e) {
                    this.compositingPass.uniforms.scrollAmount.value = e > .01 ? 1 : 0
                }
                dispose() {
                    y.h.getState().api.trigger.remove(this.onTrigger), this.glitchTimeline && this.glitchTimeline.kill(), this.settingsFolder && (this.settingsFolder.children.forEach(e => {
                        e.dispose()
                    }), this.settingsFolder.dispose())
                }
                constructor(e) {
                    this.channelsTimelines = [], this.scene = {}, this.camera = {}, this.currentChannelAmount = [0, 0, 0, 0], this.blockIncomingChannels = !1, this.extraGlitch = 0, this.isDecryptionMode = !1, this.parseChannels = () => {
                        this.channelsTimelines.forEach(e => e.clear());
                        for (let e = 1; e < 5; e++) {
                            if (void 0 === this.settings["channel" + e]) continue;
                            let t = this.settings["channel" + e].replaceAll(" ", "").split(",");
                            "" !== t[0] && t.forEach(t => {
                                let i = t.split(":");
                                if (i[0].includes(".")) {
                                    let t = i[0].split("."),
                                        n = t[0],
                                        s = t[1],
                                        a = i[1].split(">"),
                                        o = a.length,
                                        r = 1 / o;
                                    a.forEach((t, i) => {
                                        void 0 !== this.settings[n] && (0 === i ? this.channelsTimelines[e - 1].to(this.settings[n], {
                                            [s]: t,
                                            duration: 0
                                        }, 0) : this.channelsTimelines[e - 1].to(this.settings[n], {
                                            [s]: t,
                                            duration: r
                                        }, (i - 1) * r))
                                    })
                                } else {
                                    let t = i[0],
                                        n = i[1].split(">"),
                                        s = n.length,
                                        a = 1 / (s - 1);
                                    n.forEach((i, n) => {
                                        void 0 !== this.settings[t] && (0 === n ? this.channelsTimelines[e - 1].to(this.settings, {
                                            [t]: i,
                                            duration: 0
                                        }, 0) : this.channelsTimelines[e - 1].to(this.settings, {
                                            [t]: i,
                                            duration: a
                                        }, (n - 1) * a))
                                    })
                                }
                            })
                        }
                    }, this.onTrigger = e => {
                        if (e.type === y.zn.GlitchError) {
                            this.blockIncomingChannels = !0;
                            let e = f.ZP.timeline({
                                onUpdate: () => {
                                    this.applySettings(this.overrideSettings)
                                },
                                onComplete: () => {
                                    this.blockIncomingChannels = !1, [0, 1, 2, 3].forEach(e => {
                                        this.updateChannelTimeline(e, this.currentChannelAmount[e])
                                    })
                                }
                            });
                            e.set(this.overrideSettings, {
                                verticalPixelSmudgeStepUp: 80,
                                verticalPixelSmudgeStepDown: 40,
                                asciiAmount: 1,
                                asciiUvSize: 48,
                                invertAmount: 1,
                                posterizeColors: 4
                            }, 0), e.to(this.overrideSettings, {
                                invertAmount: 0,
                                duration: .2,
                                ease: "steps(3)"
                            }, .1)
                        }
                    }, this.settingsUI = new p.Z, this.renderer = e;
                    for (let e = 0; e < 4; e++) this.channelsTimelines.push(f.ZP.timeline({
                        paused: !0,
                        duration: 1
                    }));
                    this.renderTargetGeneric = new o.dd2(window.innerWidth, window.innerHeight, {
                        minFilter: o.wem,
                        magFilter: o.wem,
                        format: o.wk1,
                        stencilBuffer: !0,
                        colorSpace: o.GUF,
                        type: o.cLu
                    }), this.genericComposer = new c.x(this.renderer, this.renderTargetGeneric), this.genericComposer.setPixelRatio(1), this.renderPass = new h.C(this.scene, this.camera, void 0, void 0, 1), this.renderPass.clear = !0, this.renderPass.needsSwap = !1, this.compositingPass = new d.T(g);
                    let t = new v.default().assetManager.getTexture("ascii");
                    t && (t.wrapS = t.wrapT = o.rpg, t.colorSpace = o.KI_), this.compositingPass.uniforms.tAscii.value = t, this.compositingPass.renderToScreen = !1, this.genericComposer.addPass(this.renderPass), this.genericComposer.addPass(this.compositingPass), this.defaultSettings = {
                        verticalPixelSmudgeAmount: 0,
                        verticalPixelSmudgeStepUp: 200,
                        verticalPixelSmudgeStepDown: 2e3,
                        horisontalPixelSmudgeAmount: 0,
                        asciiAmount: 1,
                        asciiUvSize: 18,
                        posterizeColors: 21,
                        posterizeGamma: .3,
                        blockNoiseAmount: 1,
                        blockNoiseTimescale: 1,
                        invertAmount: 0,
                        hsvCorrection: {
                            x: 1,
                            y: 1,
                            z: 1
                        },
                        channel1: "",
                        channel2: "",
                        channel3: "",
                        channel4: ""
                    }, this.settings = JSON.parse(JSON.stringify(this.defaultSettings)), this.overrideSettings = JSON.parse(JSON.stringify(this.defaultSettings)), this.settingsUI.onSettingsUpdated.add(e => {
                        e.type === p.a.Post && this.applySettingsFromJSON(e.settings)
                    }), this.createUI(), this.parseChannels(), y.h.getState().api.trigger.add(this.onTrigger)
                }
            }
            var S = i(4552);
            let P = new o.Pa4;
            class w extends S.Z {
                createUI() {
                    super.createUI(), this.resetSettings(), this.isDebug && (this.settingsFolder.addBinding(this.settings, "display"), this.settingsFolder.addBinding(this.settings, "asciiThreshold", {
                        min: 0,
                        max: 1
                    }), this.settingsFolder.addBinding(this.settings, "asciiThresholdInverse"), this.settingsFolder.addBinding(this.settings, "asciiUseColor"), this.settingsFolder.addBinding(this.settings, "asciiDisplaceAmount"), this.settingsFolder.addBinding(this.settings, "asciiMeshOffsetZ"), this.settingsFolder.addBinding(this.settings, "asciiGlyphOffset", {
                        min: 0,
                        max: 1
                    }), this.settingsFolder.addBinding(this.settings, "asciiExtraNoise", {
                        min: 0,
                        max: 1
                    }), this.settingsFolder.addBinding(this.settings, "asciiBlending", {
                        options: [{
                            text: "Normal",
                            value: o.bdR
                        }, {
                            text: "Additive",
                            value: o.WMw
                        }, {
                            text: "Subtractive",
                            value: o.N4l
                        }, {
                            text: "Multiply",
                            value: o.M5h
                        }]
                    }))
                }
                createMesh() {
                    this.points.length = 0;
                    for (let e = 0; e < this.rows; e++)
                        for (let t = 0; t < this.columns; t++) P.set(t * this.sizeX, e * this.sizeY, 0), this.points.push(new o.Pa4().copy(P));
                    let e = this.points.length;
                    this.translations = new o.lb7(new Float32Array(3 * e), 3, !1, 1), this.randoms = new o.lb7(new Float32Array(1 * e), 1, !1, 1).setUsage(o.W2J), this.points.forEach((e, t) => {
                        this.translations.setXYZ(t, e.x, e.y, e.z), this.randoms.setX(t, Math.random())
                    });
                    let t = new o._12(.1, .1, 1, 1),
                        i = new o.L5s().copy(t);
                    i.setAttribute("aTranslation", this.translations), i.setAttribute("aRandom", this.randoms), i.attributes.uv = t.attributes.uv, this.mesh = new o.SPe(i, this.material, this.columns * this.rows), this.mesh.frustumCulled = !1, this.mesh.position.x = -5 + 3.3000000000000003, this.mesh.position.y = -5 + 3.3000000000000003, this.mesh.scale.setScalar(.33), this.group.add(this.mesh)
                }
                async setSource(e) {
                    if (this.getAssetType(e) === S.h.Image) {
                        let t = this.assetManager.getTexture(e);
                        t && (this.material.uniforms.sourceTexture.value = t)
                    } else if (this.getAssetType(e) === S.h.Video) {
                        let t = this.assetManager.getVideo(e);
                        t && (this.material.uniforms.sourceTexture.value = t)
                    } else this.material.uniforms.sourceTexture.value = null
                }
                setSourceTextureAspect(e) {
                    this.material.uniforms.sourceAspect.value = e
                }
                update(e) {
                    this.material.uniforms.time.value = e
                }
                setMask(e) {
                    this.material.uniforms.maskTexture.value = e
                }
                constructor() {
                    super({
                        name: "Ascii",
                        settingsType: p.a.Ascii
                    }), this.points = [], this.columns = 100, this.rows = 100, this.sizeX = .1, this.sizeY = .1, this.applySettings = () => {
                        this.mesh && (this.mesh.visible = this.settings.display, void 0 !== this.settings.displayOverride && (this.mesh.visible = this.settings.displayOverride)), this.material.uniforms.globalStrength.value = this.settingsUI.shared.globalStrength, this.material.uniforms.extraNoise.value = this.settings.asciiExtraNoise, this.material.uniforms.useColor.value = this.settings.asciiUseColor, this.material.uniforms.threshold.value = this.settings.asciiThreshold, this.material.uniforms.thresholdInverse.value = this.settings.asciiThresholdInverse, this.material.uniforms.displaceAmount.value = this.settings.asciiDisplaceAmount, this.material.uniforms.glyphOffset.value.copy(this.settings.asciiGlyphOffset), this.material.blending = this.settings.asciiBlending, this.group.position.z = this.settings.asciiMeshOffsetZ
                    }, this.defaultSettings = {
                        display: !1,
                        solo: !1,
                        asciiThreshold: 1,
                        asciiThresholdInverse: !1,
                        asciiUseColor: !0,
                        asciiDisplaceAmount: 0,
                        asciiBlending: o.bdR,
                        asciiMeshOffsetZ: 0,
                        asciiGlyphOffset: {
                            x: 0,
                            y: 0
                        },
                        asciiExtraNoise: .2,
                        channel1: "",
                        channel2: "",
                        channel3: "",
                        channel4: ""
                    }, this.settingsUI.onSharedUpdated.add(() => {
                        this.material.uniforms.globalStrength.value = this.settingsUI.shared.globalStrength
                    });
                    let e = this.assetManager.getTexture("ascii");
                    e && (e.wrapS = e.wrapT = o.rpg, e.minFilter = e.magFilter = o.TyD), this.material = new o.jyz({
                        transparent: !0,
                        depthWrite: !1,
                        depthTest: !1,
                        uniforms: {
                            resolution: {
                                value: new o.FM8
                            },
                            glyphOffset: {
                                value: new o.FM8
                            },
                            time: {
                                value: 1
                            },
                            offsetY: {
                                value: 0
                            },
                            opacity: {
                                value: 1
                            },
                            displacement: {
                                value: 0
                            },
                            displacementRotation: {
                                value: 0
                            },
                            thresholdInverse: {
                                value: 0
                            },
                            threshold: {
                                value: .7
                            },
                            globalOpacity: {
                                value: 1
                            },
                            globalStrength: {
                                value: 1
                            },
                            useColor: {
                                value: 1
                            },
                            extraNoise: {
                                value: .1
                            },
                            displaceAmount: {
                                value: 0
                            },
                            maskTexture: {
                                value: new o.xEZ
                            },
                            sourceTexture: {
                                value: new o.xEZ
                            },
                            sourceAspect: {
                                value: 1
                            },
                            asciiTexture: {
                                value: e
                            }
                        },
                        vertexShader: "precision highp float;\nprecision mediump int;\n#define GLSLIFY 1\n\nattribute vec3 aTranslation;\n\nattribute float aRandom;\n\nvarying vec2 vUv;\nvarying vec2 vUvOffsets;\nvarying vec3 vColor;\nvarying float vRandom;\n\nuniform vec2 resolution;\nuniform float displacement;\nuniform float displacementRotation;\nuniform float threshold;\nuniform float thresholdInverse;\nuniform float offsetY;\nuniform float time;\nuniform float globalStrength;\nuniform float displaceAmount;\nuniform float extraNoise;\nuniform vec2 glyphOffset;\n\nuniform sampler2D sourceTexture;\nuniform sampler2D maskTexture;\n\nvoid main() {\n\n  vUv = uv;\n  vec2 clampedUv = vec2(aTranslation.x/10.0,aTranslation.y/10.0);\n\n  vec4 sourceColor = texture2D(sourceTexture, clampedUv);\n\n  float maskColor = 1.0;//texture2D(maskTexture, aTranslation.xy/10.0).r;\n  float colorIntensity = (sourceColor.r + sourceColor.g + sourceColor.b) * 0.33;\n\n  float isIncluded = 1.0-step(threshold, mix(colorIntensity, 1.0-colorIntensity, thresholdInverse));\n  colorIntensity *= isIncluded;\n\n  vUvOffsets.x = floor( sourceColor.r*12.0 + maskColor*4.0 + glyphOffset.x*16.0)/16.0 + floor(sin(time*10.3 + aRandom*10.0)*extraNoise*aRandom*4.0)/16.0;\n  vUvOffsets.y = floor( sourceColor.g*12.0 + maskColor*4.0+ glyphOffset.y*16.0)/16.0 + floor(sin(time*10.3 + aRandom*10.0)*extraNoise*aRandom*4.0)/16.0;\n\n  vec3 translation = aTranslation;\n\n  vRandom = aRandom;\n  vColor = sourceColor.rgb;\n\n  vec3 scaledPosition = position;\n\n  //move offscreenn if not included\n  scaledPosition.x += 1000.0*(1.0-isIncluded);\n  scaledPosition.x += 1000.0 * (step(1.0, clampedUv.y) + step(1.0, 1.0-clampedUv.y));\n\n  //scaledPosition.x *= aScale.x;\n  //scaledPosition.z *= aScale.y;\n\n  scaledPosition.z += colorIntensity * 1.0 * (globalStrength + maskColor) * displaceAmount;\n\n  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(scaledPosition + translation, 1.0);\n}\n",
                        fragmentShader: "precision highp float;\n#define GLSLIFY 1\n\nuniform float opacity;\nuniform float globalOpacity;\nuniform float time;\nuniform float globalStrength;\nuniform float useColor;\n\nvarying vec3 vColor;\nvarying float vRandom;\nvarying vec2 vUv;\nvarying vec2 vUvOffsets;\n\nuniform sampler2D asciiTexture;\n\nvoid main() {\n  vec4 asciiColor = texture2D(asciiTexture, vUv/16.0 + vUvOffsets);\n\n  gl_FragColor = vec4(asciiColor.rgb, globalStrength * step(0.05, globalStrength));\n\n  if((gl_FragColor.r + gl_FragColor.g + gl_FragColor.b) * 0.33 < 0.02) {\n    discard;\n  }\n\n  gl_FragColor.rgb *= mix(vec3(1.0), vColor, useColor);\n\n  //gl_FragColor = vec4(vColor.r-vHeight, vColor.g , vColor.b, smoothstep(0.9,1.0,1.0-vHeight)*0.8 + 0.1*(1.0-vHeight));\n  //gl_FragColor.a *= 1.0-0.1 * sin(time*3.14*2.0 + vRandom*10.0);\n\n  //gl_FragColor = vec4(vColor.r, vColor.g , vColor.b, smoothstep(0.3,1.0,1.0-vHeight)*0.8 + 0.1*(1.0-vHeight));\n  //gl_FragColor.a *= (0.8-0.3*vRandom) - 0.8 * sin(time*3.14*0.3 + vRandom*100.0);\n  //gl_FragColor.a *= 0.5;\n  //gl_FragColor.a *= opacity*globalOpacity;\n\n}\n"
                    }), this.createMesh(), this.createUI()
                }
            }
            var M = i(7836);
            let A = new M.E,
                C = ["rectplane.gltf", "splitplane.gltf", "voronoiplane.gltf"];
            (n = s || (s = {})).Image = "image", n.Video = "video";
            class T extends S.Z {
                createUI() {
                    super.createUI(), this.isDebug && (this.settingsFolder.addBinding(this.settings, "display"), this.settingsFolder.addBinding(this.settings, "currentPlaneMeshName", {
                        label: "mesh",
                        options: C.map(e => ({
                            text: e,
                            value: e
                        }))
                    }).on("change", () => {
                        this.loadMesh()
                    }), this.settingsFolder.addBinding(this.settings, "lookAtCamera"), this.settingsFolder.addBinding(this.settings, "planeThreshold", {
                        min: 0,
                        max: 1
                    }), this.settingsFolder.addBinding(this.settings, "defaultColor"), this.settingsFolder.addBinding(this.settings, "blockNoiseTimescale", {
                        min: 0,
                        max: 6
                    }), this.settingsFolder.addBinding(this.settings, "blockNoiseAmount", {
                        min: 0,
                        max: 1
                    }), this.settingsFolder.addBinding(this.settings, "quadOffset"), this.settingsFolder.addBinding(this.settings, "quadExtraNoise", {
                        min: 0,
                        max: 1
                    }), this.settingsFolder.addBinding(this.settings, "shuffleGridSize", {
                        min: 1,
                        max: 100
                    }), this.settingsFolder.addBinding(this.settings, "shuffleAmount", {
                        min: 0,
                        max: 4
                    }), this.settingsFolder.addBinding(this.settings, "shuffleKeepInCenter"), this.settingsFolder.addBinding(this.settings, "quadRandomColor", {
                        min: 0,
                        max: 1
                    }))
                }
                async setSource(e) {
                    if (this.getAssetType(e) === S.h.Image) {
                        delete this.planeMaterial.defines.USE_COLOR, this.planeMaterial.needsUpdate = !0;
                        let t = this.assetManager.getTexture(e);
                        t && (this.planeMaterial.uniforms.sourceTexture.value = t)
                    } else if (this.getAssetType(e) === S.h.Video) {
                        delete this.planeMaterial.defines.USE_COLOR, this.planeMaterial.needsUpdate = !0;
                        let t = this.assetManager.getVideo(e);
                        if (t) {
                            try {
                                await t.source.data.play()
                            } catch (e) {
                                console.error(e)
                            }
                            this.planeMaterial.uniforms.sourceTexture.value = t
                        }
                    }
                }
                setSourceTextureAspect(e) {
                    this.planeMaterial.uniforms.sourceAspect.value = e
                }
                loadMesh() {
                    A.load("/models/" + this.settings.currentPlaneMeshName, e => {
                        let t = e.scene.children[0];
                        this.baseMesh && (this.baseMesh.geometry.dispose(), this.group.remove(this.baseMesh)), this.baseMesh = t;
                        let i = t.geometry.getAttribute("position"),
                            n = [],
                            s = new o.Ilk;
                        for (let e = 0; e < i.count; e += 4) s.setHex(16777215 * Math.random()), n.push(s.r, s.g, s.b), n.push(s.r, s.g, s.b), n.push(s.r, s.g, s.b), n.push(s.r, s.g, s.b);
                        t.geometry.setAttribute("randomColor", new o.a$l(n, 3)), t.geometry.applyMatrix4(new o.yGw().makeTranslation(new o.Pa4(0, 0, .01))), t.rotation.x = .5 * Math.PI, t.scale.setScalar(2), t.renderOrder = 100, t.material = this.planeMaterial, this.applySettings(), this.group.add(t)
                    }, () => {}, e => {
                        console.warn("can' find model", e)
                    })
                }
                update(e) {
                    this.planeMaterial.uniforms.time.value = e
                }
                resize(e) {
                    this.planeMaterial.uniforms.resolution.value.x = e.width, this.planeMaterial.uniforms.resolution.value.y = e.height
                }
                constructor() {
                    super({
                        name: "Plane",
                        settingsType: p.a.Plane
                    }), this.type = s.Image, this.applySettings = () => {
                        this.baseMesh && (this.baseMesh.visible = this.settings.display, void 0 !== this.settings.displayOverride && (this.baseMesh.visible = this.settings.displayOverride)), this.lookAtCamera = this.settings.lookAtCamera, this.planeMaterial.uniforms.globalStrength.value = this.settingsUI.shared.globalStrength, this.planeMaterial.uniforms.sourceThreshold.value = this.settings.planeThreshold, this.planeMaterial.uniforms.shuffleGridSize.value.copy(this.settings.shuffleGridSize), this.planeMaterial.uniforms.shuffleAmount.value = this.settings.shuffleAmount, this.planeMaterial.uniforms.shuffleKeepInCenter.value = this.settings.shuffleKeepInCenter ? 1 : 0, this.planeMaterial.uniforms.quadExtraNoise.value = this.settings.quadExtraNoise, this.planeMaterial.uniforms.quadRandomColor.value = this.settings.quadRandomColor, this.planeMaterial.uniforms.blockNoiseTimescale.value = this.settings.blockNoiseTimescale, this.planeMaterial.uniforms.blockNoiseAmount.value = this.settings.blockNoiseAmount, this.planeMaterial.uniforms.quadOffset.value.copy(this.settings.quadOffset), this.planeMaterial.uniforms.defaultColor.value.set(this.settings.defaultColor)
                    }, this.lookAtCamera = !0, this.defaultSettings = {
                        display: !1,
                        solo: !1,
                        lookAtCamera: !0,
                        defaultColor: "#000000",
                        currentPlaneMeshName: C[1],
                        planeThreshold: 0,
                        blockNoiseTimescale: .2,
                        blockNoiseAmount: 1,
                        shuffleGridSize: {
                            x: 30,
                            y: 17
                        },
                        shuffleAmount: 0,
                        shuffleKeepInCenter: !0,
                        quadRandomColor: 0,
                        quadOffset: {
                            x: 0,
                            y: 0,
                            z: 0
                        },
                        quadExtraNoise: .2,
                        channel1: "",
                        channel2: "",
                        channel3: "",
                        channel4: ""
                    }, this.settingsUI = new p.Z, this.settingsUI.onSharedUpdated.add(() => {
                        this.planeMaterial.uniforms.globalStrength.value = this.settingsUI.shared.globalStrength
                    }), this.planeMaterial = new o.FIo({
                        transparent: !1,
                        uniforms: {
                            sourceTexture: {
                                value: new o.xEZ
                            },
                            defaultColor: {
                                value: new o.Ilk(this.settings.defaultColor)
                            },
                            sourceAspect: {
                                value: 1
                            },
                            resolution: {
                                value: new o.FM8(100, 100)
                            },
                            isBloomRender: {
                                value: 0
                            },
                            time: {
                                value: 0
                            },
                            globalStrength: {
                                value: 1
                            },
                            blockNoiseTimescale: {
                                value: 1
                            },
                            blockNoiseAmount: {
                                value: 0
                            },
                            rgbWaveTimescale: {
                                value: .1
                            },
                            rgbWaveAmount: {
                                value: 1
                            },
                            shakeTimescale: {
                                value: 1
                            },
                            shakeAmount: {
                                value: 0
                            },
                            whiteNoiseAmount: {
                                value: .4
                            },
                            verticalPixelSmudgeAmount: {
                                value: 0
                            },
                            quadOffset: {
                                value: new o.Pa4(0, 0, 0)
                            },
                            quadRandomColor: {
                                value: 0
                            },
                            quadExtraNoise: {
                                value: .2
                            },
                            shuffleGridSize: {
                                value: new o.FM8(30, 17)
                            },
                            shuffleAmount: {
                                value: 0
                            },
                            shuffleKeepInCenter: {
                                value: 1
                            },
                            sourceThreshold: {
                                value: 1
                            },
                            linesAmount: {
                                value: 0
                            }
                        },
                        depthWrite: !0,
                        vertexShader: "precision highp float;\nprecision mediump int;\n#define GLSLIFY 1\n\nconst float PI = 3.1415926535897932384626433832795;\n\nuniform mat4 modelMatrix; // optional\nuniform mat4 viewMatrix; // optional\nuniform mat4 projectionMatrix; // optional\n\nattribute vec3 position;\nattribute vec3 randomColor;\nattribute vec2 uv;\nvarying vec2 vUv;\nvarying vec3 vRandomColor;\nuniform float time;\nuniform vec3 quadOffset;\nuniform float quadExtraNoise;\nuniform float globalStrength;\nuniform sampler2D maskTexture;\n\nfloat random(vec2 c){\n  return fract(sin(dot(c.xy ,vec2(12.9898,78.233))) * 43758.5453);\n}\n\nvec4 quat_from_axis_angle(vec3 axis, float angle)\n{\n  vec4 qr;\n  float half_angle = (angle * 0.5);\n  qr.x = axis.x * sin(half_angle);\n  qr.y = axis.y * sin(half_angle);\n  qr.z = axis.z * sin(half_angle);\n  qr.w = cos(half_angle);\n  return qr;\n}\n\nvec3 rotate_vertex_position(vec3 position, vec3 axis, float angle)\n{\n  vec4 q = quat_from_axis_angle(axis, angle);\n  vec3 v = position.xyz;\n  return v + 2.0 * cross(q.xyz, cross(q.xyz, v) + q.w * v);\n}\n\nvoid main()	{\n\n  float maskColor = step(0.2,texture2D(maskTexture, uv).r)*0.4;\n\n  vUv = uv;\n  vRandomColor = randomColor;\n  vec3 distortedPosition = position;\n\n  distortedPosition.xz *= 1.0 + randomColor.r * quadOffset.xy * smoothstep(randomColor.g + 0.01,randomColor.g+0.06, globalStrength);\n  distortedPosition.y +=  randomColor.r * quadOffset.z * smoothstep(randomColor.g + 0.01,randomColor.g+0.06, globalStrength);\n\n  float extraNoiseOffset = floor(sin(time*20.3 + randomColor.r*10.0) * sin(time*5.3 + randomColor.r*5.0) * quadExtraNoise)* 0.01 * globalStrength;\n  distortedPosition.x += extraNoiseOffset;\n\n  vec4 modelPosition = modelMatrix * vec4(distortedPosition,1.0);\n\n  gl_Position = projectionMatrix * viewMatrix * modelPosition;\n}\n",
                        fragmentShader: 'precision highp float;\nprecision mediump int;\n#define GLSLIFY 1\n\nconst float PI = 3.1415926535897932384626433832795;\n\nuniform vec3 defaultColor;\nuniform float time;\nuniform float sourceAspect;\nuniform float sourceThreshold;\nuniform float globalStrength;\nuniform float blockNoiseTimescale;\nuniform float blockNoiseAmount;\nuniform float rgbWaveTimescale;\nuniform float rgbWaveAmount;\nuniform float whiteNoiseAmount;\nuniform float quadRandomColor;\nuniform float shuffleAmount;\nuniform vec2 shuffleGridSize;\nuniform float shuffleKeepInCenter;\nuniform float linesAmount;\n\nuniform float verticalPixelSmudgeAmount;\n\nuniform vec2 resolution;\nuniform float isBloomRender;\nuniform sampler2D sourceTexture;\nuniform sampler2D maskTexture;\nvarying vec2 vUv;\nvarying vec3 vRandomColor;\n\nfloat random(vec2 c){\n  return fract(sin(dot(c.xy ,vec2(12.9898,78.233))) * 43758.5453);\n}\n\n//\n// Description : Array and textureless GLSL 2D/3D/4D simplex\n//               noise functions.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : ijm\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289(vec4 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute(vec4 x) {\n      return mod289(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nfloat snoise3(vec3 v)\n  {\n  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\n  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);\n\n// First corner\n  vec3 i  = floor(v + dot(v, C.yyy) );\n  vec3 x0 =   v - i + dot(i, C.xxx) ;\n\n// Other corners\n  vec3 g = step(x0.yzx, x0.xyz);\n  vec3 l = 1.0 - g;\n  vec3 i1 = min( g.xyz, l.zxy );\n  vec3 i2 = max( g.xyz, l.zxy );\n\n  //   x0 = x0 - 0.0 + 0.0 * C.xxx;\n  //   x1 = x0 - i1  + 1.0 * C.xxx;\n  //   x2 = x0 - i2  + 2.0 * C.xxx;\n  //   x3 = x0 - 1.0 + 3.0 * C.xxx;\n  vec3 x1 = x0 - i1 + C.xxx;\n  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y\n  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y\n\n// Permutations\n  i = mod289(i);\n  vec4 p = permute( permute( permute(\n              i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\n            + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))\n            + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n\n// Gradients: 7x7 points over a square, mapped onto an octahedron.\n// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)\n  float n_ = 0.142857142857; // 1.0/7.0\n  vec3  ns = n_ * D.wyz - D.xzx;\n\n  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)\n\n  vec4 x_ = floor(j * ns.z);\n  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)\n\n  vec4 x = x_ *ns.x + ns.yyyy;\n  vec4 y = y_ *ns.x + ns.yyyy;\n  vec4 h = 1.0 - abs(x) - abs(y);\n\n  vec4 b0 = vec4( x.xy, y.xy );\n  vec4 b1 = vec4( x.zw, y.zw );\n\n  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;\n  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;\n  vec4 s0 = floor(b0)*2.0 + 1.0;\n  vec4 s1 = floor(b1)*2.0 + 1.0;\n  vec4 sh = -step(h, vec4(0.0));\n\n  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\n  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;\n\n  vec3 p0 = vec3(a0.xy,h.x);\n  vec3 p1 = vec3(a0.zw,h.y);\n  vec3 p2 = vec3(a1.xy,h.z);\n  vec3 p3 = vec3(a1.zw,h.w);\n\n//Normalise gradients\n  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n  p0 *= norm.x;\n  p1 *= norm.y;\n  p2 *= norm.z;\n  p3 *= norm.w;\n\n// Mix final noise value\n  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n  m = m * m;\n  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),\n                                dot(p2,x2), dot(p3,x3) ) );\n}\n\nvec2 rotate(vec2 v, float a)\n{\n	float s = sin(a + PI);\n	float c = cos(a + PI);\n	mat2 m = mat2(c, -s, s, c);\n	return m * v;\n}\n\nconst float interval = 3.0;\n\nvoid main() {\n	float strength = globalStrength;\n\n  float gridSizeX = shuffleGridSize.x;\n  float gridSizeY = shuffleGridSize.y;\n\n  float positionInTileX = mod(vUv.x,1.0 / gridSizeX);\n  float positionInTileY = mod(vUv.y,1.0 / gridSizeY);\n\n  float tileX = floor(vUv.x * gridSizeX);\n  float tileY = floor(vUv.y * gridSizeY);\n\n  float rnd = random(vec2(tileX,tileY));\n  float offsetTileX = floor( mod(rnd,1.0) * strength * shuffleAmount * gridSizeX);\n  float offsetTileY = floor( mod(rnd,1.0) * strength * shuffleAmount * gridSizeY);\n\n  //shift offset from center\n  if(shuffleKeepInCenter > 0.0) {\n    offsetTileX *=  1.0 - 2.0 * step(0.5, mod(random(vec2(tileX,tileY)),1.0));\n    offsetTileY *=  1.0 - 2.0 * step(0.5, mod(random(vec2(tileX,tileY)),1.0));\n  }\n\n  float shuffledX = (tileX + offsetTileX)/gridSizeX + positionInTileX;\n  float shuffledY = (tileY + offsetTileY)/gridSizeY + positionInTileY;\n\n  vec2 shuffledUv = vec2(shuffledX, shuffledY);\n\n  //shuffledUv = mix(shuffledUv, vUv, 1.0);\n\n  vec2 scaledUv = shuffledUv * 1.2 - 0.1;\n  scaledUv.y *= sourceAspect;\n  scaledUv.y -= sourceAspect*0.25*step(1.01,sourceAspect);\n\n  //vertical pixel "smudge"\n  //scaledUv.y += random(vec2(vUv.x,0.0)) * 0.1 * verticalPixelSmudgeAmount*strength;\n  //scaledUv.y -= random(vec2(floor(vUv.x*100.0)/100.0,0.0)) * 0.1 * verticalPixelSmudgeAmount*strength;\n\n  scaledUv.y = 1.0-scaledUv.y;\n\n  vec2 clampedUv = scaledUv;\n  clampedUv.x = clamp(clampedUv.x,0.0,1.0);\n  clampedUv.y = clamp(clampedUv.y,0.0,1.0);\n\n  float y = clampedUv.y * resolution.y;\n\n  float rgbDiff = 0.0;//(6.0 + sin(time * 500.0 * rgbWaveTimescale + scaledUv.y * 40.0) * (20.0 * strength + 1.0)) / resolution.x * rgbWaveAmount;\n  float rgbUvX = scaledUv.x;\n\n  float bnTime = floor(time * 1.0 * blockNoiseTimescale) * 200.0;\n  float noiseX = step((snoise3(vec3(0.0, scaledUv.x * 3.0, bnTime)) + 1.0) / 2.0, 0.12 + strength * 0.3);\n  float noiseY = step((snoise3(vec3(0.0, scaledUv.y * 3.0, bnTime)) + 1.0) / 2.0, 0.12 + strength * 0.3);\n  float bnMask = noiseX * noiseY * blockNoiseAmount;\n  float bnUvX = scaledUv.x + sin(bnTime) * 0.2 * strength;\n  vec3 bnRGB = texture2D(sourceTexture, vec2(bnUvX, scaledUv.y)).rgb * bnMask;\n  vec4 blockNoise = vec4(bnRGB, 1.0);\n\n  float bnTime2 = floor(time * 5.0 * blockNoiseTimescale) * 300.0;\n  float noiseX2 = step((snoise3(vec3(0.0, scaledUv.x * 2.0, bnTime2)) + 1.0) / 2.0, 0.12 + strength * 0.5);\n  float noiseY2 = step((snoise3(vec3(0.0, scaledUv.y * 18.0, bnTime2)) + 1.0) / 2.0, 0.12 + strength * 0.3);\n  float bnMask2 = noiseX2 * noiseY2 * blockNoiseAmount;\n  vec3 bnRGB2 = texture2D(sourceTexture, vec2(bnUvX, scaledUv.y)).rgb * bnMask2;\n  vec4 blockNoise2 = vec4(bnRGB2, 1.0);\n\n  float isInside = step(0.0,scaledUv.x)*step(0.0,1.0-scaledUv.x)*step(0.0,scaledUv.y)*step(0.0,1.0-scaledUv.y);\n\n  #ifdef USE_COLOR\n    gl_FragColor.rgb = defaultColor * (isInside - bnMask - bnMask2);\n    gl_FragColor.rgb += (blockNoise.rgb + blockNoise2.rgb)*blockNoiseAmount*strength;\n    gl_FragColor.a = 1.0;\n  #else\n    gl_FragColor = texture2D(sourceTexture,clampedUv) * (isInside - bnMask - bnMask2) + (blockNoise + blockNoise2)*blockNoiseAmount*strength;\n  #endif\n\n  gl_FragColor.rgb = mix(gl_FragColor.rgb, vRandomColor, quadRandomColor * strength);\n\n  float intensity = (gl_FragColor.r+gl_FragColor.g+gl_FragColor.b)*0.33;\n\n  if(isInside + bnMask + bnMask2 < 0.9 || intensity < sourceThreshold*globalStrength || gl_FragColor.a < 0.1) {\n    discard;\n  }\n}\n',
                        defines: {
                            USE_COLOR: ""
                        }
                    }), this.createUI(), this.loadMesh()
                }
            }
            var F = i(6455);
            new o.Ilk;
            class E extends S.Z {
                createParticles() {
                    let e = new o.lb7(new Float32Array(45), 3, !1, 1),
                        t = new o.lb7(new Float32Array(45), 3, !1, 1),
                        i = new o.lb7(new Float32Array(30), 2, !1, 1);
                    for (let n = 0; n < 15; n++) {
                        e.setXYZ(n, 1.6 * Math.random() - .8, .8 * Math.random() - .4, 0);
                        let s = {
                                h: 0,
                                s: 0,
                                l: 0
                            },
                            a = new o.Ilk(F.e.Magenta).getHSL(s);
                        a.h += .1 * Math.random() - .05;
                        let r = new o.Ilk().setHSL(a.h, a.s, a.l);
                        t.setXYZ(n, r.r, r.g, r.b), i.setXY(n, Math.random(), Math.random())
                    }
                    let n = new o._12(1, 1, 1, 1),
                        s = new o.L5s().copy(n);
                    s.setAttribute("particlePosition", e), s.setAttribute("particleColor", t), s.setAttribute("particleRandom", i);
                    let a = new o.SPe(s, this.quadsMaterial, 15);
                    a.renderOrder = 0, this.group.add(a)
                }
                createUI() {
                    super.createUI(), this.isDebug && (this.settingsFolder.addBinding(this.settings, "display"), this.settingsFolder.addBinding(this.settings, "particleScale"), this.settingsFolder.addBinding(this.settings, "snapAmount", {
                        min: 0,
                        max: 1
                    }), this.settingsFolder.addBinding(this.settings, "snapDistance", {
                        min: 1,
                        max: 40
                    }), this.settingsFolder.addBinding(this.settings, "displaceAmount", {
                        min: 0,
                        max: 5
                    }), this.settingsFolder.addBinding(this.settings, "reduce", {
                        min: 0,
                        max: 1
                    }))
                }
                update(e, t) {
                    this.quadsMaterial.uniforms.time.value = e
                }
                setSettings(e) {}
                constructor() {
                    super({
                        name: "Background quads",
                        settingsType: p.a.BackgroundQuads
                    }), this.applySettings = () => {
                        this.group.visible = this.settings.display, void 0 !== this.settings.displayOverride && (this.group.visible = this.settings.displayOverride), this.quadsMaterial.uniforms.particleScale.value.copy(this.settings.particleScale), this.quadsMaterial.uniforms.snapAmount.value = this.settings.snapAmount, this.quadsMaterial.uniforms.snapDistance.value = this.settings.snapDistance, this.quadsMaterial.uniforms.displaceAmount.value = this.settings.displaceAmount, this.quadsMaterial.uniforms.reduce.value = this.settings.reduce
                    }, this.lookAtCamera = !0, this.defaultSettings = {
                        display: !1,
                        solo: !1,
                        particleScale: {
                            x: 1,
                            y: 1,
                            z: 1
                        },
                        snapAmount: 1,
                        snapDistance: 18,
                        displaceAmount: 5,
                        reduce: 0,
                        channel1: "",
                        channel2: "",
                        channel3: "",
                        channel4: ""
                    }, this.quadsMaterial = new o.jyz({
                        transparent: !1,
                        depthWrite: !1,
                        depthTest: !1,
                        uniforms: {
                            time: {
                                value: 0
                            },
                            particleScale: {
                                value: new o.Pa4(this.defaultSettings.particleScale.x, this.defaultSettings.particleScale.y, this.defaultSettings.particleScale.z)
                            },
                            snapAmount: {
                                value: 0
                            },
                            snapDistance: {
                                value: 15.8
                            },
                            displaceAmount: {
                                value: 0
                            },
                            reduce: {
                                value: 0
                            }
                        },
                        vertexShader: "#define GLSLIFY 1\n#define PI 3.1415926535897932384626433832795\n\nattribute float opacity;\nattribute vec3 particleColor;\nattribute vec3 particlePosition;\nattribute vec2 particleRandom;\n\nvarying vec3 vColor;\nvarying float vOpacity;\nvarying vec2 vUv;\n\nuniform float time;\nuniform vec3 particleScale;\nuniform float snapAmount;\nuniform float snapDistance;\nuniform float displaceAmount;\nuniform float reduce;\n\nvec3 billboard(vec2 v, mat4 view){\n  vec3 up = vec3(view[0][1], view[1][1], view[2][1]);\n  vec3 right = vec3(view[0][0], view[1][0], view[2][0]);\n  vec3 p = right * v.x + up * v.y;\n  return p;\n}\n\nvoid main()\n{\n  vUv = uv;\n  vec3 worldPos;\n  vec3 worldNormal;\n\n  float life = mod(time*0.1 + 100.0 * particleRandom.x, 1.0);\n  float lifePart = smoothstep(0.8, 0.9, life);\n\n  //shorter animation period\n\n  float isHidden = 1.0 - step(0.7,life);\n\n  isHidden += 1.0-step(reduce, particleRandom.x);\n\n  //use sampled color from MeshSurfaceSampler instead\n  vColor = particleColor;\n\n  //scale\n  vec3 scaledPosition = position;// * (particleScale + 2.0 * particleRandom);//billboard(position.xy * (particleScale.xy + 2.0 * particleRandom), viewMatrix);\n  scaledPosition.x *= 1.0+particleScale.x*particleRandom.x*0.5;\n  scaledPosition.y *= 1.0+particleScale.y*particleRandom.y*0.5;\n\n  vec3 snappedPosition = particlePosition + vec3(-0.2 + 0.4*particleRandom.x,-0.1 + 0.2*particleRandom.y,0.4*particleRandom.x);\n  snappedPosition.x += 1000.0 * isHidden;\n\n  worldPos = (modelMatrix * vec4( scaledPosition + snappedPosition, 1.0 )).xyz;\n\n  // snap\n  //worldPos = mix(worldPos,floor(worldPos * snapDistance) / snapDistance, snapAmount);\n\n  vec4 worldViewPosition = viewMatrix * vec4(worldPos,1.0);\n\n	gl_Position = projectionMatrix * worldViewPosition;\n\n}\n",
                        fragmentShader: "#define GLSLIFY 1\nvarying vec3 vColor;\nvarying vec2 vUv;\n\nvarying float vOpacity;\n\nvoid main() {\n\n  float opacity = 1.0;\n  if(vOpacity < 0.01) {\n   //discard;\n  }\n\n  float lineGradient = 1.0-mod(vUv.y * 3.0 + vUv.x,1.0);\n\n  gl_FragColor = vec4( vColor,1.0);\n\n}\n",
                        side: o.ehD
                    }), this.createParticles(), this.resetSettings(), this.createUI()
                }
            }
            var z = i(441),
                U = {
                    getMaterial() {
                        let e = new o.nls({
                            color: 6710886,
                            transparent: !0
                        });
                        return e.onBeforeCompile = t => {
                            t.uniforms.revealFactor = {
                                value: 0
                            }, t.uniforms.time = {
                                value: 0
                            }, t.vertexShader = t.vertexShader.replace("#include <common>", "\n        #include <common>\n        varying vec3 vWorldPosition;\n      ").replace("#include <project_vertex>", "\n          vec4 mvPosition = vec4( transformed, 1.0 );\n\n          vec4 mPosition = modelMatrix * mvPosition;\n\n          mvPosition = viewMatrix * mPosition;\n\n          vWorldPosition = mvPosition.xyz;\n\n          gl_Position = projectionMatrix * mvPosition;\n      "), t.fragmentShader = t.fragmentShader.replace("void main() {", "\n          uniform float revealFactor;\n          varying vec3 vWorldPosition;\n          uniform float time;\n          void main() {\n          ").replace("#include <color_fragment>", "").replace("#include <opaque_fragment>", "\n          #include <opaque_fragment>\n\n          float reveal = revealFactor;\n\n          gl_FragColor.rgb = gl_FragColor.rgb;\n\n          float tileSize = 4.0;\n          float noise = smoothstep(0.995,1.0,sin(-vWorldPosition.z*3.14+floor(time*15.0)/15.0));\n\n          if(noise < 0.3) {\n            discard;\n          }\n        "), e.userData.shader = t
                        }, e
                    }
                };
            class O extends S.Z {
                async setSource(e) {
                    if (this.clear(), this.getAssetType(e) === S.h.Model) {
                        let t = this.assetManager.getModel(e);
                        if (t) {
                            let e = t.clone().children[0];
                            e.scale.setScalar(.9);
                            let i = t.getObjectByName("model_full");
                            i && i.traverse(e => {
                                e.isMesh && (e.renderOrder = 4, this.originalMeshes.add(e.clone()))
                            });
                            let n = t.getObjectByName("model_wireframe");
                            n || (n = t.getObjectByName("model_full")), e.updateMatrixWorld(), n && n.traverse(e => {
                                e.isMesh && (e.renderOrder = 3, this.createWireframeMesh(e))
                            }), i && i.traverse(e => {
                                if (e.isMesh) {
                                    let t = this.replaceMaterial(e),
                                        i = this.createFrontQuads(e),
                                        n = this.createBackQuads(e);
                                    t && t.map ? (i.material.uniforms.tMeshTexture.value = t.map, n.material.uniforms.tMeshTexture.value = t.map) : (i.material.uniforms.tMeshTexture.value = null, n.material.uniforms.tMeshTexture.value = null), e.renderOrder = 3
                                }
                            }), this.applySettings()
                        }
                    } else if (this.getAssetType(e) === S.h.Image) {
                        let t = this.assetManager.getTexture(e);
                        if (t) {
                            let e = new o.Kj0(new o._12(t.source.data.width / 450, t.source.data.height / 450, 1, 1), new o.vBJ({
                                color: 16777215,
                                map: t
                            }));
                            this.createFrontQuads(e, 1), this.createBackQuads(e, 1), this.applySettings()
                        }
                    } else if (this.getAssetType(e) === S.h.Video) {
                        let t = this.assetManager.getVideo(e);
                        if (t) {
                            let e = new o.Kj0(new o._12(t.source.data.videoWidth / 450, t.source.data.height / 450, 10, 10), new o.vBJ({
                                color: 16777215,
                                map: t
                            }));
                            this.createFrontQuads(e, 1), this.createBackQuads(e, 1), this.applySettings()
                        }
                    }
                }
                replaceMaterial(e) {
                    let t = e.material;
                    return t.onBeforeCompile = e => {
                        e.uniforms.time = {
                            value: 0
                        }, e.uniforms.originalMeshReveal = {
                            value: this.settings.originalMeshReveal
                        }, e.vertexShader = e.vertexShader.replace("#include <common>", "\n          #include <common>\n          varying vec3 vWorldPosition;\n        ").replace("#include <project_vertex>", "\n          vec4 worldPosition = modelMatrix * vec4(position,1.0);\n          vec4 mvPosition = vec4( transformed, 1.0 );\n\n          vec4 mPosition = modelMatrix * mvPosition;\n\n          mvPosition = viewMatrix * mPosition;\n\n          gl_Position = projectionMatrix * mvPosition;\n\n      ").replace("#include <worldpos_vertex>", "\n          vWorldPosition = worldPosition.xyz;\n      "), e.fragmentShader = e.fragmentShader.replace("void main() {", "\n          uniform float originalMeshReveal;\n          varying vec3 vWorldPosition;\n          uniform float time;\n\n          float hash11(float p) {\n            vec3 p3  = fract(vec3(p) * 443.8975);\n            p3 += dot(p3, p3.yzx + 19.19);\n            return 2.0*fract((p3.x + p3.y) * p3.z)-1.0;\n          }\n\n          float noise(float t) {\n              float i = floor(t);\n              float f = fract(t);\n              return mix(hash11(i) * f, hash11(i+1.0) * (f - 1.0), f);\n          }\n\n          void main() {\n          ").replace("#include <color_fragment>", "").replace("#include <opaque_fragment>", "\n          #include <opaque_fragment>\n\n          float sliceSize = 1.0-originalMeshReveal;\n\n          float noiseSignal = mod(vWorldPosition.x+5.0,sliceSize);\n\n          //noiseSignal /= 2.0;\n          //noiseSignal += 1.0;\n\n          float noise = smoothstep(0.0,1.0,noiseSignal);\n\n          if(noiseSignal > 0.5 && originalMeshReveal<0.9) {\n            discard;\n          }\n\n          //gl_FragColor.rgb = vec3(noiseSignal,0.0,0.0);\n        "), t.userData.shader = e
                    }, t
                }
                clear() {
                    this.originalMeshes.children.forEach(e => {
                        var t;
                        null === (t = e.parent) || void 0 === t || t.remove(e), e.geometry.dispose()
                    }), this.wireFrameMeshes.children.forEach(e => {
                        var t;
                        null === (t = e.parent) || void 0 === t || t.remove(e), e.geometry.dispose()
                    }), this.particleMeshes.forEach(e => {
                        e.geometry.dispose(), this.group.remove(e)
                    }), this.particleMeshes.length = 0
                }
                createFrontQuads(e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                        i = new z.a(e).build(),
                        n = new o.Pa4,
                        s = new o.Pa4,
                        a = new o.Ilk,
                        r = new o.FM8,
                        l = new o.lb7(new Float32Array(600), 3, !1, 1),
                        c = new o.lb7(new Float32Array(600), 3, !1, 1),
                        h = new o.lb7(new Float32Array(200), 1, !1, 1),
                        d = new o.lb7(new Float32Array(400), 2, !1, 1);
                    for (let o = 0; o < 200; o++) {
                        i.sample(n, s, a, r);
                        let u = e.localToWorld(n);
                        l.setXYZ(o, u.x, u.y, u.z + Math.random() * t - .5 * t), e.geometry.attributes.color || a.copy(e.material.color), c.setXYZ(o, a.r, a.g, a.b), h.setX(o, Math.random()), d.setXY(o, r.x, r.y)
                    }
                    let u = new o._12(.03, .04, 1, 1),
                        m = new o.L5s().copy(u);
                    m.setAttribute("particlePosition", l), m.setAttribute("particleColor", c), m.setAttribute("particleRandom", h), m.setAttribute("particleUv", d);
                    let g = new o.SPe(m, this.particlesMaterialFront, 200);
                    g.renderOrder = 100, this.particleMeshes.push(g), this.group.add(g);
                    let p = e.material;
                    return p.map && (g.material.uniforms.tMeshTexture.value = p.map), g
                }
                createBackQuads(e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                        i = new z.a(e).build(),
                        n = new o.Pa4,
                        s = new o.Pa4,
                        a = new o.Ilk,
                        r = new o.FM8,
                        l = new o.lb7(new Float32Array(300), 3, !1, 1),
                        c = new o.lb7(new Float32Array(300), 3, !1, 1),
                        h = new o.lb7(new Float32Array(100), 1, !1, 1),
                        d = new o.lb7(new Float32Array(200), 2, !1, 1);
                    for (let o = 0; o < 100; o++) {
                        i.sample(n, s, a, r);
                        let u = e.localToWorld(n);
                        l.setXYZ(o, u.x, u.y, u.z + Math.random() * t - .5 * t), c.setXYZ(o, a.r, a.g, a.b), h.setX(o, Math.random()), d.setXY(o, r.x, r.y)
                    }
                    let u = new o._12(.03, .03, 1, 1),
                        m = new o.L5s().copy(u);
                    m.setAttribute("particlePosition", l), m.setAttribute("particleColor", c), m.setAttribute("particleRandom", h), m.setAttribute("particleUv", d);
                    let g = ["#757575", "#575757"],
                        p = new o.SPe(m, this.particlesMaterialBack, 100);
                    for (let e = 0; e < 100; e++) {
                        let t = new o.Ilk(g[Math.floor(Math.random() * g.length)]);
                        p.geometry.attributes.particleColor.setXYZ(e, t.r, t.g, t.b)
                    }
                    p.geometry.attributes.particleColor.needsUpdate = !0, p.renderOrder = 2, this.particleMeshes.push(p), this.group.add(p);
                    let v = e.material;
                    return v.map && (p.material.uniforms.tMeshTexture.value = v.map), p
                }
                createWireframeMesh(e) {
                    let t = new o.Uk6(e.geometry);
                    t.applyMatrix4(e.matrixWorld);
                    let i = new o.ejS(t, this.wireframeMaterial);
                    i.renderOrder = 3, i.computeLineDistances(), this.wireFrameMeshes.add(i)
                }
                createUI() {
                    super.createUI(), this.isDebug && (this.settingsFolder.addBinding(this.settings, "display"), this.settingsFolder.addBinding(this.settings, "snapAmount", {
                        min: 0,
                        max: 1
                    }), this.settingsFolder.addBinding(this.settings, "snapDistance", {
                        min: 1,
                        max: 40
                    }), this.settingsFolder.addBinding(this.settings, "displaceAmount", {
                        min: 0,
                        max: 10
                    }), this.settingsFolder.addBinding(this.settings, "showOriginal"), this.settingsFolder.addBinding(this.settings, "originalMeshReveal", {
                        min: 0,
                        max: 1
                    }), this.settingsFolder.addBinding(this.settings, "revealFactor", {
                        min: 0,
                        max: 1
                    }), this.settingsFolder.addBinding(this.settings, "wireframeColor"), this.settingsFolder.addBinding(this.settings, "wireframeOpacity", {
                        min: 0,
                        max: 1
                    }), this.settingsFolder.addBinding(this.settings, "reduceFront", {
                        min: 0,
                        max: 1
                    }), this.settingsFolder.addBinding(this.settings, "reduceBack", {
                        min: 0,
                        max: 1
                    }), this.settingsFolder.addBinding(this.settings, "useVertexColors", {
                        min: 0,
                        max: 1,
                        label: "Back sample color"
                    }))
                }
                destroy() {
                    this.particleMeshes.length = 0, this.clear(), super.destroy()
                }
                update(e) {
                    this.particlesMaterialFront.uniforms.time.value = e, this.particlesMaterialBack.uniforms.time.value = e, this.wireFrameMeshes.children.forEach(t => {
                        let i = t.material;
                        i.userData.shader && (i.userData.shader.uniforms.time.value = e)
                    }), this.originalMeshes.children.forEach(t => {
                        if (t.isMesh) {
                            let i = t.material;
                            i.userData.shader && (i.userData.shader.uniforms.time.value = e)
                        }
                    })
                }
                constructor() {
                    super({
                        name: "Surface quads",
                        settingsType: p.a.SurfaceQuads
                    }), this.group = new o.ZAu, this.particleMeshes = [], this.wireFrameMeshes = new o.ZAu, this.originalMeshes = new o.ZAu, this.applySettings = () => {
                        (!this.group || (this.group.visible = this.settings.display, void 0 !== this.settings.displayOverride && (this.group.visible = this.settings.displayOverride), this.group.visible)) && (this.particleMeshes.forEach(e => {
                            e.visible = this.settings.display
                        }), this.wireFrameMeshes.visible = this.settings.wireframeOpacity > 0, this.originalMeshes.visible = this.settings.originalMeshReveal > 0, this.originalMeshes.children.forEach(e => {
                            let t = e.material;
                            t.userData.shader && (t.userData.shader.uniforms.originalMeshReveal.value = this.settings.originalMeshReveal)
                        }), this.wireFrameMeshes.children.forEach(e => {
                            let t = e.material;
                            t.opacity = this.settings.wireframeOpacity, t.color.set(this.settings.wireframeColor)
                        }), this.particlesMaterialFront && (this.particlesMaterialFront.uniforms.snapAmount.value = this.settings.snapAmount, this.particlesMaterialFront.uniforms.snapDistance.value = this.settings.snapDistance, this.particlesMaterialFront.uniforms.displaceAmount.value = this.settings.displaceAmount, this.particlesMaterialFront.uniforms.revealFactor.value = o.M8C.smoothstep(this.settings.revealFactor, 0, 1), this.particlesMaterialFront.uniforms.reduce.value = this.settings.reduceFront, this.particlesMaterialFront.uniforms.useVertexColors.value = 0, this.particlesMaterialFront.uniforms.tMeshTexture.value, this.particlesMaterialBack.uniforms.snapAmount.value = this.settings.snapAmount, this.particlesMaterialBack.uniforms.useVertexColors.value = this.settings.useVertexColors, this.particlesMaterialBack.uniforms.snapDistance.value = this.settings.snapDistance, this.particlesMaterialBack.uniforms.displaceAmount.value = this.settings.displaceAmount, this.particlesMaterialBack.uniforms.revealFactor.value = o.M8C.smoothstep(this.settings.revealFactor, .8, 1), this.particlesMaterialBack.uniforms.reduce.value = this.settings.reduceBack))
                    }, this.defaultSettings = {
                        display: !1,
                        solo: !1,
                        useVertexColors: .15,
                        snapAmount: 1,
                        snapDistance: 18,
                        displaceAmount: 18,
                        showOriginal: !0,
                        originalMeshReveal: 0,
                        revealFactor: 0,
                        wireframeColor: "#666666",
                        wireframeOpacity: 0,
                        reduceFront: 0,
                        reduceBack: 0,
                        channel1: "",
                        channel2: "",
                        channel3: "",
                        channel4: ""
                    }, this.wireframeMaterial = U.getMaterial(), this.wireframeMaterial.color.set(this.defaultSettings.wireframeColor);
                    let e = this.assetManager.getTexture("ascii");
                    e && (e.minFilter = e.magFilter = o.TyD, e.wrapS = e.wrapT = o.rpg), this.particlesMaterialFront = new o.jyz({
                        transparent: !1,
                        depthWrite: !0,
                        depthTest: !1,
                        uniforms: {
                            time: {
                                value: 0
                            },
                            particleScale: {
                                value: new o.Pa4(6, 6, 6)
                            },
                            snapAmount: {
                                value: this.settings.snapAmount
                            },
                            snapDistance: {
                                value: this.settings.snapAmount
                            },
                            displaceAmount: {
                                value: this.settings.displaceAmount
                            },
                            reduce: {
                                value: this.settings.reduceFront
                            },
                            useVertexColors: {
                                value: 0
                            },
                            tSprite: {
                                value: e
                            },
                            tMeshTexture: {
                                value: null
                            },
                            revealFactor: {
                                value: 0
                            },
                            renderFront: {
                                value: 1
                            },
                            extraVerticalScale: {
                                value: 0
                            }
                        },
                        blending: o.bdR,
                        vertexShader: "#define GLSLIFY 1\n#define PI 3.1415926535897932384626433832795\n\nattribute float opacity;\nattribute vec3 particleColor;\nattribute vec3 particlePosition;\nattribute vec2 particleUv;\nattribute float particleRandom;\n\nvarying vec3 vColor;\nvarying float vOpacity;\nvarying vec2 vUv;\n\nuniform sampler2D tMeshTexture;\nuniform float time;\n\nuniform float snapAmount;\nuniform float snapDistance;\nuniform float useVertexColors;\nuniform float displaceAmount;\nuniform float renderFront;\nuniform float revealFactor;\nuniform float extraVerticalScale;\nuniform float reduce;\n\nvec3 billboard(vec2 v, mat4 view){\n  vec3 up = vec3(view[0][1], view[1][1], view[2][1]);\n  vec3 right = vec3(view[0][0], view[1][0], view[2][0]);\n  vec3 p = right * v.x + up * v.y;\n  return p;\n}\n\nfloat hash11(float p) {\n    vec3 p3  = fract(vec3(p) * 443.8975);\n    p3 += dot(p3, p3.yzx + 19.19);\n    return 2.0*fract((p3.x + p3.y) * p3.z)-1.0;\n}\n\nfloat noise(float t) {\n    float i = floor(t);\n    float f = fract(t);\n\n    return mix(hash11(i) * f, hash11(i+1.0) * (f - 1.0), f);\n}\n\nvoid main()\n{\n  vec3 worldPos;\n  vec3 worldNormal;\n\n  float life = mod(time*0.5 + 100.0 * particleRandom, 1.0);\n  float lifePart = smoothstep(0.0 + renderFront*0.8, 1.0, life);\n\n  //shorter animation period\n\n  float isHidden = 1.0 - step(0.7,life);\n\n  //shorter animation period\n\n  vOpacity = 1.0;\n\n  vUv = uv/16.0 + vec2(3.0+floor(particleRandom*5.0),6.0)/16.0;// - vec2(particleRandom*8.0,4.0)/16.0;\n\n  //sample texture excatly at point uv (same for all vertices of instance), send single color to fragment shader\n  vec4 texelColor = texture2D(tMeshTexture, particleUv);\n\n  //use sampled color from MeshSurfaceSampler instead\n  vColor = mix(texelColor.rgb, particleColor, useVertexColors );\n\n  vec3 displacedParticlePos = particlePosition;\n\n  //start scale\n  //vec3 scale = vec3(1.0+3.0*noise(particleRandom+vUv.x),3.0+3.0*noise(particleRandom+vUv.y),3.0*noise(particleRandom))*particleRandom + (1.0-renderFront)*(displaceAmount+2.6)*vec3(5.0);\n  vec3 scale = vec3(4.0, 4.0, 4.0) * particleRandom;\n\n  //render on one side of z\n  vec4 centerInViewSpace = viewMatrix * modelMatrix * vec4(displacedParticlePos,1.0);\n  if(centerInViewSpace.z + 5.0 < 0.0 && renderFront > 0.2) {\n    isHidden = 1.0;\n    vOpacity = 0.0;\n  }\n\n  isHidden += 1.0-step(reduce, particleRandom);\n\n  if(renderFront < 0.5) {\n    scale += vec3(5.0);\n    //scale.y *= extraVerticalScale*particleRandom;\n  }\n\n  //scale\n  vec3 scaledPosition = billboard(position.xy*scale.xy, viewMatrix);\n\n  vec3 displacedPosition = scaledPosition + displacedParticlePos + vec3(0.0,100.0,0.0)*isHidden;\n  vec3 snappedPosition = displacedPosition;//mix(displacedPosition,floor(displacedPosition * snapDistance) / snapDistance, snapAmount);\n\n  //worldPos = (modelMatrix * vec4( scaledPosition + snappedPosition, 1.0 )).xyz;\n  worldPos = vec3(modelMatrix * vec4( snappedPosition, 1.0 )).xyz;\n\n  // snap\n  //worldPos = mix(worldPos,floor(worldPos * snapDistance) / snapDistance, snapAmount);\n\n  vec4 worldViewPosition = viewMatrix * vec4(worldPos,1.0);\n\n	gl_Position = projectionMatrix * worldViewPosition;\n\n}\n",
                        fragmentShader: "#define GLSLIFY 1\nvarying vec3 vColor;\nvarying vec2 vUv;\nuniform sampler2D tSprite;\nuniform float textureMix;\nuniform float textureScale;\nuniform float renderFront;\n\nvarying float vOpacity;\n\nuniform sampler2D tMeshTexture;\n\nvoid main() {\n\n  vec4 texelColor = texture2D(tSprite, vUv);\n  //float opacity = 1.0-length(vUv*2.0-vec2(1.0));\n  //opacity *= vOpacity;\n  float opacity = 1.0;\n  float bright = (texelColor.r + texelColor.g + texelColor.b)*0.33;\n  if(vOpacity < 0.01 || bright<0.1) {\n   discard;\n  }\n\n  gl_FragColor = vec4( vColor*texelColor.rgb,1.0);\n\n}\n",
                        side: o.Wl3
                    }), this.particlesMaterialBack = this.particlesMaterialFront.clone(), this.particlesMaterialBack.uniforms.renderFront.value = 0, this.particlesMaterialBack.uniforms.useVertexColors.value = this.settings.useVertexColors, this.particlesMaterialBack.uniforms.extraVerticalScale.value = 0, this.particlesMaterialBack.uniforms.reduce.value = this.settings.reduceBack, this.group.add(this.wireFrameMeshes), this.group.add(this.originalMeshes), this.createUI(), this.applySettings()
                }
            }
            let D = new o.Ilk;
            class I extends S.Z {
                async setSource(e) {
                    if (this.clear(), this.getAssetType(e) === S.h.Model) {
                        let t = this.assetManager.getModel(e);
                        if (t) {
                            let e = t.clone().children[0];
                            e.scale.setScalar(.9), e.children.length > 0 ? e.children.forEach(e => {
                                this.createParticles(e)
                            }) : this.createParticles(e), this.applySettings()
                        }
                    } else if (this.getAssetType(e) === S.h.Image) {
                        let t = this.assetManager.getTexture(e);
                        if (t) {
                            let e = new o.Kj0(new o._12(t.source.data.width / 450, t.source.data.height / 450, 1, 1), new o.vBJ({
                                map: t
                            }));
                            this.createParticles(e, 1), this.applySettings()
                        }
                    } else if (this.getAssetType(e) === S.h.Video) {
                        let t = this.assetManager.getVideo(e);
                        if (t) {
                            let e = new o.Kj0(new o._12(t.source.data.videoWidth / 450, t.source.data.height / 450, 1, 1), new o.vBJ({
                                map: t
                            }));
                            this.createParticles(e), this.applySettings()
                        }
                    }
                }
                clear() {
                    this.particleMeshes.forEach(e => {
                        e.geometry.dispose(), this.group.remove(e)
                    }), this.particleMeshes.length = 0
                }
                createParticles(e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                        i = new z.a(e).build(),
                        n = new o.Pa4,
                        s = new o.Pa4,
                        a = new o.Ilk,
                        r = new o.FM8,
                        l = new o.lb7(new Float32Array(150), 3, !1, 1),
                        c = new o.lb7(new Float32Array(150), 3, !1, 1),
                        h = new o.lb7(new Float32Array(100), 2, !1, 2),
                        d = ["#5217BB", "#924FDC", "#EA29E6", "#F27D55", "#F5E574", "#ADFF00", "#278C24", "#28B5CD", "#311EF3"];
                    for (let o = 0; o < 50; o++) {
                        i.sample(n, s, a, r);
                        let u = e.localToWorld(n);
                        l.setXYZ(o, u.x, u.y, u.z + Math.random() * t - .5 * t);
                        let m = D.set(d[Math.floor(Math.random() * d.length)]);
                        c.setXYZ(o, m.r, m.g, m.b), h.setXY(o, Math.random(), Math.random())
                    }
                    let u = new o._12(.01, .01, 1, 1),
                        m = new o.L5s().copy(u);
                    m.setAttribute("particlePosition", l), m.setAttribute("particleColor", c), m.setAttribute("particleRandom", h);
                    let g = new o.SPe(m, this.particlesMaterialFront, 50);
                    g.renderOrder = 100, this.particleMeshes.push(g), this.group.add(g)
                }
                createUI() {
                    super.createUI(), this.isDebug && (this.settingsFolder.addBinding(this.settings, "display"), this.settingsFolder.addBinding(this.settings, "useVertexColors", {
                        min: 0,
                        max: 1
                    }), this.settingsFolder.addBinding(this.settings, "snapAmount", {
                        min: 0,
                        max: 1
                    }), this.settingsFolder.addBinding(this.settings, "snapDistance", {
                        min: 1,
                        max: 40
                    }), this.settingsFolder.addBinding(this.settings, "displaceAmount", {
                        min: 0,
                        max: 10
                    }), this.settingsFolder.addBinding(this.settings, "showOriginal"), this.settingsFolder.addBinding(this.settings, "revealFactor", {
                        min: 0,
                        max: 1
                    }), this.settingsFolder.addBinding(this.settings, "reduce", {
                        min: 0,
                        max: 1
                    }))
                }
                destroy() {
                    this.particleMeshes.length = 0, super.destroy()
                }
                update(e) {
                    this.particlesMaterialFront.uniforms.time.value = e
                }
                constructor() {
                    super({
                        name: "Surface ascii",
                        settingsType: p.a.SurfaceAscii
                    }), this.group = new o.ZAu, this.particleMeshes = [], this.applySettings = () => {
                        (!this.group || (this.group.visible = this.settings.display, void 0 !== this.settings.displayOverride && (this.group.visible = this.settings.displayOverride), this.group.visible)) && (this.particleMeshes.forEach(e => {
                            e.visible = this.settings.display
                        }), this.particlesMaterialFront && (this.particlesMaterialFront.uniforms.snapAmount.value = this.settings.snapAmount, this.particlesMaterialFront.uniforms.snapDistance.value = this.settings.snapDistance, this.particlesMaterialFront.uniforms.displaceAmount.value = this.settings.displaceAmount, this.particlesMaterialFront.uniforms.reduce.value = this.settings.reduce))
                    }, this.lookAtCamera = !0, this.defaultSettings = {
                        display: !1,
                        solo: !1,
                        useVertexColors: 0,
                        snapAmount: 1,
                        snapDistance: 18,
                        displaceAmount: 18,
                        showOriginal: !0,
                        revealFactor: 0,
                        reduce: 0,
                        channel1: "",
                        channel2: "",
                        channel3: "",
                        channel4: ""
                    };
                    let e = this.assetManager.getTexture("ascii");
                    e && (e.minFilter = e.magFilter = o.TyD, e.wrapS = e.wrapT = o.rpg), this.particlesMaterialFront = new o.jyz({
                        transparent: !1,
                        depthWrite: !0,
                        depthTest: !1,
                        uniforms: {
                            time: {
                                value: 0
                            },
                            particleScale: {
                                value: new o.Pa4(6, 6, 6)
                            },
                            snapAmount: {
                                value: this.settings.snapAmount
                            },
                            snapDistance: {
                                value: this.settings.snapAmount
                            },
                            displaceAmount: {
                                value: this.settings.displaceAmount
                            },
                            asciiTexture: {
                                value: e
                            },
                            revealFactor: {
                                value: 0
                            },
                            renderFront: {
                                value: 1
                            },
                            reduce: {
                                value: 0
                            }
                        },
                        blending: o.bdR,
                        vertexShader: "precision highp float;\n#define GLSLIFY 1\n\n#define PI 3.1415926535897932384626433832795\n\nattribute float opacity;\nattribute vec3 particleColor;\nattribute vec3 particlePosition;\nattribute vec2 particleRandom;\n\nvarying vec3 vColor;\nvarying float vOpacity;\nvarying vec2 vUv;\n\nuniform float time;\n\nuniform float snapAmount;\nuniform float snapDistance;\nuniform float displaceAmount;\nuniform float renderFront;\nuniform float reduce;\n\nvec3 billboard(vec2 v, mat4 view){\n  vec3 up = vec3(view[0][1], view[1][1], view[2][1]);\n  vec3 right = vec3(view[0][0], view[1][0], view[2][0]);\n  vec3 p = right * v.x + up * v.y;\n  return p;\n}\n\nfloat hash11(float p) {\n    vec3 p3  = fract(vec3(p) * 443.8975);\n    p3 += dot(p3, p3.yzx + 19.19);\n    return 2.0*fract((p3.x + p3.y) * p3.z)-1.0;\n}\n\nfloat noise(float t) {\n    float i = floor(t);\n    float f = fract(t);\n\n    return mix(hash11(i) * f, hash11(i+1.0) * (f - 1.0), f);\n}\n\nvoid main()\n{\n  vec3 worldPos;\n  vec3 worldNormal;\n\n  float life = mod(time*0.5 + 100.0 * particleRandom.x, 1.0);\n  float lifePart = smoothstep(0.8, 0.9, life);\n\n  //shorter animation period\n\n  float isHidden = 1.0 - step(0.7,life);\n\n  //shorter animation period\n\n  vOpacity = 1.0;\n\n  //hmmm...\n  vec2 offset = floor(particleRandom*16.0)/16.0;\n  vUv = uv/16.0 + offset;\n\n  //sample texture excatly at point uv (same for all vertices of instance), send single color to fragment shader\n\n  //use sampled color from MeshSurfaceSampler instead\n  vColor = particleColor;\n\n  //back quads are black\n  //vColor = mix(vec3(0.0),vColor, renderFront);\n\n  vec3 displacedParticlePos = particlePosition*(1.0+displaceAmount*renderFront);\n\n  vec4 centerInViewSpace = viewMatrix * modelMatrix * vec4(displacedParticlePos,1.0);\n  if(centerInViewSpace.z + 5.0 < 0.0 && renderFront > 0.2) {\n    isHidden = 1.0;\n    vOpacity = 0.0;\n  }\n\n  isHidden += 1.0-step(reduce, particleRandom.x);\n\n  //start scale\n  //vec3 scale = vec3(1.0+3.0*noise(particleRandom+vUv.x),3.0+3.0*noise(particleRandom+vUv.y),3.0*noise(particleRandom))*particleRandom + (1.0-renderFront)*(displaceAmount+2.6)*vec3(5.0);\n  vec3 scale = vec3(6.0)*particleRandom.x+ (1.0-renderFront)*(displaceAmount+2.6)*vec3(5.0);\n\n  //scale\n  vec3 scaledPosition = position * scale;//billboard(position.xy, viewMatrix) * scale.xyz;\n  vec3 displacedPosition = scaledPosition + displacedParticlePos + vec3(0.0,100.0,0.0)*isHidden;\n  vec3 snappedPosition = displacedPosition;//mix(displacedPosition,floor(displacedPosition * snapDistance) / snapDistance, snapAmount);\n\n  //worldPos = (modelMatrix * vec4( scaledPosition + snappedPosition, 1.0 )).xyz;\n  worldPos = vec3(modelMatrix * vec4( snappedPosition, 1.0 )).xyz;\n\n  // snap\n  //worldPos = mix(worldPos,floor(worldPos * snapDistance) / snapDistance, snapAmount);\n\n  vec4 worldViewPosition = viewMatrix * vec4(worldPos,1.0);\n\n	gl_Position = projectionMatrix * worldViewPosition;\n\n}\n",
                        fragmentShader: "precision highp float;\n#define GLSLIFY 1\n\nvarying vec3 vColor;\nvarying vec2 vUv;\nvarying float vOpacity;\nuniform sampler2D asciiTexture;\n\nvoid main() {\n\n  vec4 texelColor = texture2D(asciiTexture, vUv);\n\n  if(vOpacity < 0.01 || (texelColor.r+texelColor.g+texelColor.b)*0.33 < 0.2) {\n   discard;\n  }\n\n  gl_FragColor = vec4( texelColor.rgb*vColor,1.0);\n\n}\n",
                        side: o.Wl3
                    }), this.createUI(), this.applySettings()
                }
            }
            new(i(1349)).F, new M.E;
            class k extends S.Z {
                async setSource(e) {
                    if ("" !== e) {
                        if (this.isVideoTexture = !1, delete this.pointCloudMaterial.defines.USE_TEXTURE, this.pointCloudMaterial.uniforms.sourceTexture.value = null, this.getAssetType(e) === S.h.Model) {
                            let t = this.assetManager.getModel(e);
                            if (t) {
                                let e = this.generatePointCloud(t);
                                this.processGeometry(e)
                            }
                        } else if (this.getAssetType(e) === S.h.Image) {
                            let t = this.assetManager.getTexture(e);
                            if (t) {
                                this.pointCloudMaterial.uniforms.sourceTexture.value = t, this.pointCloudMaterial.defines = {
                                    USE_TEXTURE: ""
                                }, this.pointCloudMaterial.needsUpdate = !0;
                                let e = this.generatePointCloudFromTexture(t);
                                this.processGeometry(e)
                            }
                        } else if (this.getAssetType(e) === S.h.Video) {
                            let t = this.assetManager.getVideo(e);
                            if (t) {
                                this.pointCloudMaterial.uniforms.sourceTexture.value = t, this.pointCloudMaterial.defines = {
                                    USE_TEXTURE: ""
                                }, this.pointCloudMaterial.needsUpdate = !0;
                                try {
                                    await t.source.data.play()
                                } catch (e) {
                                    console.error(e)
                                }
                                this.isVideoTexture = !0;
                                let e = this.generatePointCloudFromVideo(t);
                                this.processGeometry(e)
                            }
                        }
                    }
                }
                generatePointCloud(e) {
                    let t = [],
                        i = [],
                        n = [],
                        s = [],
                        a = [],
                        r = new o.Pa4,
                        l = new o.Pa4,
                        c = new o.Ilk,
                        h = new o.FM8,
                        d = new o.u9r;
                    return e.traverse(e => {
                        if (e.isMesh) {
                            let u, m;
                            if (this.settings.useEdges) {
                                u = new o.TOt(e.geometry);
                                for (let r = 0; r < 1e4; r++) {
                                    let d = u.attributes.position.array,
                                        m = Math.floor(Math.random() * (d.length / 3)),
                                        g = d[3 * m],
                                        p = d[3 * m + 1],
                                        v = d[3 * m + 2],
                                        f = d[3 * m + 3],
                                        x = d[3 * m + 4],
                                        y = d[3 * m + 5],
                                        b = new o.Pa4(g, p, v),
                                        S = new o.Pa4(f, x, y),
                                        P = b.lerp(S, Math.random());
                                    P = e.localToWorld(P), t.push(r), i.push(P.x, P.y, P.z), n.push(l.x, l.y, l.z), s.push(h.x, h.y), a.push(c.r, c.g, c.b)
                                }
                            } else {
                                e.material.map && (this.pointCloudMaterial.uniforms.sourceTexture.value = e.material.map, this.pointCloudMaterial.defines.USE_TEXTURE = ""), m = new z.a(e).build();
                                for (let o = 0; o < 1e4; o++) {
                                    m.sample(r, l, c, h), c.convertSRGBToLinear();
                                    let d = e.localToWorld(r);
                                    t.push(o), i.push(d.x, d.y, d.z), n.push(l.x, l.y, l.z), s.push(h.x, h.y), a.push(c.r, c.g, c.b)
                                }
                            }
                            d.setIndex(t), d.setAttribute("position", new o.a$l(i, 3)), n.length > 0 && d.setAttribute("normal", new o.a$l(n, 3)), s.length > 0 && d.setAttribute("uv", new o.a$l(s, 2)), a.length > 0 && d.setAttribute("color", new o.a$l(a, 3))
                        }
                    }), d.computeBoundingSphere(), d
                }
                generatePointCloudFromTexture(e) {
                    let t = [],
                        i = [],
                        n = [],
                        s = new o.u9r,
                        a = e.source.data,
                        r = a.getContext("2d").getImageData(0, 0, a.width, a.height).data;
                    for (let e = 0; e < a.height; e += 8)
                        for (let s = 0; s < a.width; s += 8) {
                            let o = (e * a.width + s) * 4,
                                l = r[o] / 255,
                                c = r[o + 1] / 255,
                                h = r[o + 2] / 255,
                                d = r[o + 3] / 255;
                            if (d > 0) {
                                let o = s - a.width / 2;
                                o *= .003;
                                let r = a.height / 2 - e;
                                r *= .003, t.push(o, r, 0), n.push(l, c, h), i.push(s / a.width, 1 - e / a.height)
                            }
                        }
                    return s.setAttribute("position", new o.a$l(t, 3)), s.setAttribute("uv", new o.a$l(i, 2)), s.setAttribute("color", new o.a$l(n, 3)), s.computeBoundingSphere(), s
                }
                generatePointCloudFromVideo(e) {
                    let t = [],
                        i = [],
                        n = [],
                        s = new o.u9r,
                        a = document.createElement("canvas"),
                        r = a.getContext("2d");
                    this.isVideoTexture ? (a.width = e.source.data.videoWidth, a.height = e.source.data.videoHeight) : (a.width = e.image.width, a.height = e.image.height), r.drawImage(e.image, 0, 0, a.width, a.height);
                    let l = r.getImageData(0, 0, a.width, a.height).data;
                    for (let e = 0; e < a.height; e += 8)
                        for (let s = 0; s < a.width; s += 8) {
                            let o = (e * a.width + s) * 4,
                                r = l[o] / 255,
                                c = l[o + 1] / 255,
                                h = l[o + 2] / 255,
                                d = s - a.width / 2;
                            d *= .003;
                            let u = a.height / 2 - e;
                            u *= .003, t.push(d, u, 0), this.isVideoTexture ? n.push(1, 1, 1) : n.push(r, c, h), i.push(s / a.width, 1 - e / a.height)
                        }
                    return s.setAttribute("position", new o.a$l(t, 3)), s.setAttribute("uv", new o.a$l(i, 2)), s.setAttribute("color", new o.a$l(n, 3)), s.computeBoundingSphere(), s
                }
                processGeometry(e) {
                    this.removeMesh();
                    let t = new o.TlE(new Float32Array(2 * e.attributes.position.count), 2, !1).setUsage(o.W2J);
                    for (let i = 0; i < e.attributes.position.count; i++) t.setXY(i, Math.random(), Math.random());
                    e.setAttribute("random", t), this.pointCloudMaterial.needsUpdate = !0;
                    let i = new o.woe(e, this.pointCloudMaterial);
                    i.frustumCulled = !1, i.scale.multiplyScalar(1), this.mesh = i, this.group.add(i), this.applySettings()
                }
                createUI() {
                    super.createUI(), this.isDebug && (this.settingsFolder.addBinding(this.settings, "display"), this.settingsFolder.addBinding(this.settings, "sphereRevealInner", {
                        label: "Sphere mask min",
                        min: 0,
                        max: 1
                    }), this.settingsFolder.addBinding(this.settings, "sphereRevealOuter", {
                        label: "Sphere mask max",
                        min: 0,
                        max: 1
                    }), this.settingsFolder.addBinding(this.settings, "randomOffset", {
                        label: "Random offset",
                        min: 0,
                        max: 10
                    }), this.settingsFolder.addBinding(this.settings, "toFloorAmount", {
                        label: "To floor",
                        min: 0,
                        max: 1
                    }), this.settingsFolder.addBinding(this.settings, "reduceParticles", {
                        label: "Reduce particles",
                        min: 0,
                        max: 1
                    }), this.settingsFolder.addBinding(this.settings, "progressCurveIn", {
                        label: "Curve in",
                        min: 0,
                        max: 1
                    }), this.settingsFolder.addBinding(this.settings, "progressCurveOut", {
                        label: "Curve out",
                        min: 0,
                        max: 1
                    }), this.settingsFolder.addBinding(this.settings, "inOutDistance", {
                        label: "In out dist",
                        min: 0,
                        max: 5
                    }), this.settingsFolder.addBinding(this.settings, "surfaceRelease", {
                        label: "Surface release",
                        min: 0,
                        max: 1
                    }), this.settingsFolder.addBinding(this.settings, "snapAmount", {
                        label: "Snap amount",
                        min: 0,
                        max: 1
                    }), this.settingsFolder.addBinding(this.settings, "snapDensity", {
                        label: "Snap density",
                        min: 1,
                        max: 100
                    }), this.settingsFolder.addBinding(this.settings, "textureDisplace", {
                        label: "Texture displace",
                        min: 0,
                        max: 1
                    }), this.settingsFolder.addBinding(this.settings, "extraSizeThreshold", {
                        label: "Extra size threshold",
                        min: 0,
                        max: 1
                    }), this.settingsFolder.addBinding(this.settings, "baseSizeFactor", {
                        label: "Base size",
                        min: 0,
                        max: 1
                    }))
                }
                update(e) {
                    this.mesh && (this.pointCloudMaterial.uniforms.time.value = e)
                }
                removeMesh() {
                    this.mesh && (this.group.remove(this.mesh), this.mesh.geometry.dispose())
                }
                constructor() {
                    super({
                        name: "Point cloud",
                        settingsType: p.a.PointCloud
                    }), this.isVideoTexture = !1, this.applySettings = () => {
                        this.mesh && (this.mesh.visible = this.settings.display, void 0 !== this.settings.displayOverride && (this.mesh.visible = this.settings.displayOverride)), this.pointCloudMaterial.uniforms.sphereRevealInner.value = this.settings.sphereRevealInner, this.pointCloudMaterial.uniforms.sphereRevealOuter.value = this.settings.sphereRevealOuter, this.pointCloudMaterial.uniforms.randomOffset.value = this.settings.randomOffset, this.pointCloudMaterial.uniforms.toFloorAmount.value = this.settings.toFloorAmount, this.pointCloudMaterial.uniforms.reduceParticles.value = this.settings.reduceParticles, this.pointCloudMaterial.uniforms.progressCurveIn.value = this.settings.progressCurveIn, this.pointCloudMaterial.uniforms.progressCurveOut.value = this.settings.progressCurveOut, this.pointCloudMaterial.uniforms.surfaceRelease.value = this.settings.surfaceRelease, this.pointCloudMaterial.uniforms.inOutDistance.value = this.settings.inOutDistance, this.pointCloudMaterial.uniforms.snapAmount.value = this.settings.snapAmount, this.pointCloudMaterial.uniforms.snapDensity.value = this.settings.snapDensity, this.pointCloudMaterial.uniforms.extraSizeThreshold.value = this.settings.extraSizeThreshold, this.pointCloudMaterial.uniforms.baseSizeFactor.value = this.settings.baseSizeFactor, this.pointCloudMaterial.uniforms.textureDisplace.value = this.settings.textureDisplace
                    }, this.settingsUI.onSharedUpdated.add(() => {
                        this.pointCloudMaterial.uniforms.globalStrength.value = this.settingsUI.shared.globalStrength
                    }), this.settingsUI.onSettingsUpdated.add(e => {
                        e.type, p.a.PointCloud
                    }), this.defaultSettings = {
                        display: !1,
                        solo: !1,
                        useEdges: !1,
                        globalStrength: 0,
                        sphereRevealOuter: 1,
                        sphereRevealInner: 0,
                        randomOffset: 0,
                        toFloorAmount: 0,
                        progressCurveIn: .3,
                        progressCurveOut: .7,
                        surfaceRelease: 1,
                        inOutDistance: .7,
                        reduceParticles: 0,
                        snapAmount: 0,
                        snapDensity: 30,
                        textureDisplace: 0,
                        baseSizeFactor: 0,
                        extraSizeThreshold: 0,
                        channel1: "",
                        channel2: "",
                        channel3: "",
                        channel4: ""
                    }, this.pointCloudMaterial = new o.FIo({
                        uniforms: {
                            time: {
                                value: 0
                            },
                            sphereRevealOuter: {
                                value: 1
                            },
                            sphereRevealInner: {
                                value: 0
                            },
                            randomOffset: {
                                value: 0
                            },
                            reduceParticles: {
                                value: 0
                            },
                            progressCurveIn: {
                                value: 0
                            },
                            progressCurveOut: {
                                value: 0
                            },
                            toFloorAmount: {
                                value: 0
                            },
                            surfaceRelease: {
                                value: 0
                            },
                            inOutDistance: {
                                value: 2
                            },
                            globalStrength: {
                                value: 0
                            },
                            snapAmount: {
                                value: 0
                            },
                            snapDensity: {
                                value: 0
                            },
                            extraSizeThreshold: {
                                value: 0
                            },
                            baseSizeFactor: {
                                value: 0
                            },
                            textureDisplace: {
                                value: 1
                            },
                            sourceTexture: {
                                value: new o.xEZ
                            }
                        },
                        defines: {
                            USE_TEXTURE: ""
                        },
                        vertexShader: "#define PI 3.14159265359\n\nprecision highp float;\n#define GLSLIFY 1\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform float time;\nuniform float sphereRevealOuter;\nuniform float sphereRevealInner;\nuniform float randomOffset;\nuniform float toFloorAmount;\nuniform float reduceParticles;\nuniform float globalStrength;\nuniform float progressCurveIn;\nuniform float progressCurveOut;\nuniform float inOutDistance;\nuniform float surfaceRelease;\nuniform float snapAmount;\nuniform float snapDensity;\nuniform float extraSizeThreshold;\nuniform float baseSizeFactor;\nuniform float textureDisplace;\n\nattribute vec3 position;\n\nattribute float size;\nattribute vec3 color;\nattribute vec2 uv;\nattribute vec2 random;\nvarying float vAlpha;\nvarying vec3 vColor;\n\nuniform sampler2D sourceTexture;\n\n//	Simplex 3D Noise\n//	by Ian McEwan, Ashima Arts\n//\nvec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}\nvec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}\n\nfloat snoise(vec3 v){\n  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\n  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);\n\n// First corner\n  vec3 i  = floor(v + dot(v, C.yyy) );\n  vec3 x0 =   v - i + dot(i, C.xxx) ;\n\n// Other corners\n  vec3 g = step(x0.yzx, x0.xyz);\n  vec3 l = 1.0 - g;\n  vec3 i1 = min( g.xyz, l.zxy );\n  vec3 i2 = max( g.xyz, l.zxy );\n\n  //  x0 = x0 - 0. + 0.0 * C\n  vec3 x1 = x0 - i1 + 1.0 * C.xxx;\n  vec3 x2 = x0 - i2 + 2.0 * C.xxx;\n  vec3 x3 = x0 - 1. + 3.0 * C.xxx;\n\n// Permutations\n  i = mod(i, 289.0 );\n  vec4 p = permute( permute( permute(\n            i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\n          + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))\n          + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n\n// Gradients\n// ( N*N points uniformly over a square, mapped onto an octahedron.)\n  float n_ = 1.0/7.0; // N=7\n  vec3  ns = n_ * D.wyz - D.xzx;\n\n  vec4 j = p - 49.0 * floor(p * ns.z *ns.z);  //  mod(p,N*N)\n\n  vec4 x_ = floor(j * ns.z);\n  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)\n\n  vec4 x = x_ *ns.x + ns.yyyy;\n  vec4 y = y_ *ns.x + ns.yyyy;\n  vec4 h = 1.0 - abs(x) - abs(y);\n\n  vec4 b0 = vec4( x.xy, y.xy );\n  vec4 b1 = vec4( x.zw, y.zw );\n\n  vec4 s0 = floor(b0)*2.0 + 1.0;\n  vec4 s1 = floor(b1)*2.0 + 1.0;\n  vec4 sh = -step(h, vec4(0.0));\n\n  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\n  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;\n\n  vec3 p0 = vec3(a0.xy,h.x);\n  vec3 p1 = vec3(a0.zw,h.y);\n  vec3 p2 = vec3(a1.xy,h.z);\n  vec3 p3 = vec3(a1.zw,h.w);\n\n//Normalise gradients\n  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n  p0 *= norm.x;\n  p1 *= norm.y;\n  p2 *= norm.z;\n  p3 *= norm.w;\n\n// Mix final noise value\n  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n  m = m * m;\n  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),\n                                dot(p2,x2), dot(p3,x3) ) );\n}\n\nvec3 randomDiskPoint(vec3 rand, vec3 n) {\n  float r = rand.x * 0.5 + 0.5; // [-1..1) -> [0..1)\n  float angle = (rand.y + 1.0) * PI; // [-1..1] -> [0..2*PI)\n  float sr = sqrt(r);\n  vec2 p = vec2(sr * cos(angle), sr * sin(angle));\n  /*\n    * Compute some arbitrary tangent space for orienting\n    * our disk towards the normal. We use the camera's up vector\n    * to have some fix reference vector over the whole screen.\n    */\n  vec3 tangent = normalize(rand);\n  vec3 bitangent = cross(tangent, n);\n  tangent = cross(bitangent, n);\n\n  /* Make our disk orient towards the normal. */\n  return tangent * p.x + bitangent * p.y;\n}\n\nvoid main() {\n  vColor = color;\n\n  #ifdef USE_TEXTURE\n    vec4 sourceColor = texture2D(sourceTexture, vec2(uv.x, uv.y));\n    vColor *= sourceColor.rgb;\n  #endif\n\n  vec3 newPosition = position;\n\n  float gate = step(0.9,random.x)* color.b;\n  float gate2 = step(0.98,random.x) * color.r;\n  float lifeProgress = mod(time * (0.01+random.x*0.1) + random.x*1000.0,1.0);\n\n  float inProgress = smoothstep(0.0,progressCurveIn,lifeProgress);\n  float duringProgress = smoothstep(progressCurveIn,progressCurveOut,lifeProgress);\n  float outProgress = smoothstep(progressCurveOut,1.0,lifeProgress);\n\n  inProgress = clamp(0.0,1.0,inProgress);\n  duringProgress = clamp(0.0,1.0,duringProgress);\n  outProgress = clamp(0.0,1.0,outProgress);\n\n  //?\n  newPosition.y -= inOutDistance + random.x*gate2;\n\n  //in\n  newPosition.y += inProgress*inOutDistance + random.x*gate2;\n  vAlpha += inProgress;\n\n  //during\n  newPosition.y += lifeProgress * 1.3 * gate * surfaceRelease;\n  newPosition.y += lifeProgress * 3.3 * gate2 * surfaceRelease;\n  newPosition += snoise(vec3(lifeProgress * 5.0,position.x * 10.0, position.z * lifeProgress)) * 0.2 * gate * surfaceRelease;\n  newPosition += snoise(vec3(newPosition.x + time * 0.1, newPosition.y + time * 0.1, random.x)) * randomOffset * 0.1;\n\n  #ifdef USE_TEXTURE\n    //newPosition.z = 2.5*(sourceColor.r+sourceColor.g+sourceColor.b)*0.33*textureDisplace;\n  #endif\n\n  //alpha\n  //fade in during in animation\n  vAlpha = inProgress;\n  //vAlpha = (1.0-(newPosition.y-position.y))*random;\n\n  float distanceToCenter = distance(newPosition, vec3(-0.55, 0.0, 0.5));\n  //newPosition = newPosition + vec3(1000.0)*step(sphereRevealOuter * 3.5, distanceToCenter);\n  //newPosition = newPosition + vec3(1000.0)*step(distanceToCenter, sphereRevealInner * 2.0);\n  newPosition = newPosition + randomDiskPoint(newPosition*random.x, vec3(0.0,0.0,0.25))*randomOffset;\n\n  newPosition.y = mix(newPosition.y,-1.2,toFloorAmount*abs(random.x*newPosition.x));\n  newPosition.y = mix(newPosition.y,-1.2,toFloorAmount);\n\n  newPosition.x += step(1.0-reduceParticles, random.y)*1000.0;\n  //out\n  newPosition.y -= outProgress*inOutDistance;\n\n  vAlpha -= outProgress;\n\n  float isFloorActivated = clamp(smoothstep(toFloorAmount*10.0,toFloorAmount*9.0, newPosition.x + 5.0),0.0,1.0);\n  vAlpha -= isFloorActivated*step(0.2,random.x);\n\n  //snap\n  newPosition.xz = mix(newPosition.xz, floor(newPosition.xz*snapDensity)/snapDensity, snapAmount);\n\n  vec4 mvPosition = modelViewMatrix * vec4( newPosition, 1.0 );\n  gl_PointSize = (size + (0.03+baseSizeFactor*0.06) + smoothstep(1.0-extraSizeThreshold,1.0,random.x) * 0.15 + (step(0.99,inProgress)-step(0.01,outProgress))*0.01*random.x) * ( 300.0 / -mvPosition.z );\n\n  gl_Position = projectionMatrix * mvPosition;\n\n}\n",
                        fragmentShader: "precision highp float;\n#define GLSLIFY 1\nvarying vec3 vColor;\nvarying float vAlpha;\n\nvoid main() {\n  gl_FragColor = vec4(vColor, vAlpha );\n}\n",
                        depthTest: !0,
                        alphaTest: .1,
                        transparent: !0,
                        blending: o.bdR
                    }), this.createUI(), this.applySettings()
                }
            }
            var R = i(0),
                N = i(2260),
                _ = i(2794);
            let B = "/models/",
                L = "/images/",
                j = "/videos/",
                Y = "/assets/",
                X = [T, k, O, w],
                Z = {
                    [p.a.BackgroundQuads]: E,
                    [p.a.Plane]: T,
                    [p.a.Ascii]: w,
                    [p.a.PointCloud]: k,
                    [p.a.SurfaceQuads]: O,
                    [p.a.SurfaceAscii]: I
                };
            class G extends R.Q {
                initDragAndDrop() {
                    let e = a.Z.getRenderer().domElement.parentElement;
                    e && (e.addEventListener("dragover", e => {
                        e.preventDefault(), e.dataTransfer && (e.dataTransfer.dropEffect = "copy")
                    }), e.addEventListener("drop", e => {
                        if (e.preventDefault(), e.dataTransfer) {
                            let t = e.dataTransfer.files[0],
                                i = t.name.endsWith(".jpg") || t.name.endsWith(".png") || t.name.endsWith(".mp4"),
                                n = t.name.endsWith(".glb");
                            this.clearAssetWarning(), t && (i || n) ? y.h.getState().api.set({
                                assetUrl: URL.createObjectURL(t) + "?" + t.name,
                                effectPresetName: n ? "default" : "default-image"
                            }) : (this.addAssetWarning("Filetype not supported"), console.error("Invalid file format. Please provide a .glb file."))
                        }
                    }))
                }
                async init() {
                    var e;
                    await this.load({
                        debounce: _.hg
                    }), this.settingsUI = new p.Z, this.experience.debug.isActive && (this.initSettingsUI(), this.applySettings(), this.createAllModules()), this.settingsUI.onSettingsUpdated.add(e => {
                        if (e.type === p.a.All) {
                            Object.keys(e.settings).forEach(t => {
                                void 0 !== this.defaultSettings[t] && (this.settings[t] = e.settings[t])
                            }), this.camera.position.z = this.settings.cameraZ;
                            let t = y.h.getState().backgroundColor1,
                                i = y.h.getState().backgroundColor2;
                            t && (this.settings.backgroundColor1 = t), i && (this.settings.backgroundColor2 = i), this.initSettingsUI(), this.applySettings()
                        } else {
                            let t = Z[e.type];
                            if (t && !this.activeEffects.find(t => t.settingsType === e.type)) {
                                let i = new t;
                                this.activeEffects.push(i), this.scene.add(i.group), i.applySettingsFromJSON(e.settings)
                            }
                        }
                    }), this.settingsUI.onSettingsReset.add(() => {
                        this.settings = JSON.parse(JSON.stringify(this.defaultSettings))
                    }), this.settingsUI.setPreset(this.experience.debug.params.preset ? this.experience.debug.params.preset : y.h.getState().effectPresetName, !0), null === (e = this.settingsFolder) || void 0 === e || e.refresh();
                    let t = y.h.getState();
                    return this.currentAssetUrl = t.assetUrl, this.currentEffectPresetName = t.effectPresetName, await this.loadAsset(t.assetUrl).then(() => {
                        N.Z.emit(N.F.WEBGL_ASSET_LOADED, {
                            assetUrl: t.assetUrl
                        })
                    }).catch(() => {
                        N.Z.emit(N.F.WEBGL_ASSET_LOAD_ERROR, {
                            assetUrl: t.assetUrl
                        })
                    }), this.unsubscribeToStoreFunction = y.h.subscribe(this.onStoreStateChanged), this.postEffectManager.render(0, 0), await new Promise(e => setTimeout(e, 100)), Promise.resolve()
                }
                transitionIn() {
                    return new Promise(e => {
                        this.totalProgress = 0, this.resetAllChannels(), e(), this.postEffectManager.fromZeroColors().then(() => {
                            this.isDecryptionMode ? this.settingsUI.setPreset(y.h.getState().effectPresetName + "-decrypted", !0) : this.totalProgress = 0
                        })
                    })
                }
                transitionOut() {
                    return this.unsubscribeToStoreFunction && this.unsubscribeToStoreFunction(), Promise.resolve()
                }
                afterTransitionOut() {
                    return this.totalProgress = 0, this.isDecryptionMode = !1, this.experience.assetManager.unloadNamespace("streamnode-content"), new Promise((e, t) => {
                        this.experience.debug.reset(), e()
                    })
                }
                resetAllChannels() {
                    this.postEffectManager.setProgress(0), this.postEffectManager.updateChannelTimeline(0, 0), this.postEffectManager.updateChannelTimeline(1, 0), this.postEffectManager.updateChannelTimeline(2, 0), this.postEffectManager.updateChannelTimeline(3, 0)
                }
                gotoDecrypted() {
                    this.isDecryptionMode = !0, this.postEffectManager.startDecryptionMode(), this.settingsUI.setPreset(y.h.getState().effectPresetName + "-decrypted")
                }
                createAllModules() {
                    X.forEach(e => {
                        let t = new e;
                        t.settingsType === p.a.BackgroundQuads || t.settingsType === p.a.SurfaceAscii ? this.camera.add(t.group) : this.scene.add(t.group), this.activeEffects.push(t)
                    })
                }
                getAllEffects() {
                    return this.activeEffects
                }
                extractSettingsDiff() {
                    let e = {};
                    this.activeEffects.forEach(t => {
                        let i = t.getSettingsDiff();
                        Object.keys(i).length > 0 && (e[t.settingsType] = i)
                    }), Object.keys(this.settings).forEach(t => {
                        JSON.stringify(this.settings[t]) !== JSON.stringify(this.defaultSettings[t]) && (e[t] = this.settings[t])
                    });
                    let t = {};
                    this.postEffectManager && Object.keys(t = this.postEffectManager.getSettingsDiff()).length > 0 && (e.post = t), console.log(JSON.stringify(e))
                }
                initSettingsUI() {
                    this.settingsFolder && this.settingsFolder.dispose(), this.experience.debug.isActive && (this.settingsFolder = this.settingsUI.pane.addFolder({
                        title: "General",
                        expanded: !1,
                        index: 0
                    }), this.settingsFolder.addBinding(this.settings, "backgroundColor1").on("change", this.applySettings), this.settingsFolder.addBinding(this.settings, "backgroundColor2").on("change", this.applySettings), this.settingsFolder.addBinding(this.settings, "directionalIntensity").on("change", () => {
                        this.dirLight.intensity = this.settings.directionalIntensity
                    }), this.settingsFolder.addBinding(this.settings, "ambientIntensity").on("change", () => {
                        this.ambientLight.intensity = this.settings.ambientIntensity
                    }), this.settingsFolder.addButton({
                        title: "print to console"
                    }).on("click", () => {
                        this.extractSettingsDiff()
                    }), this.settingsFolder.addButton({
                        title: "play sound"
                    }).on("click", () => {}), this.settingsFolder.addButton({
                        title: "Reset settings"
                    }).on("click", () => {
                        this.settingsUI.resetToDefault()
                    }))
                }
                createBackground() {
                    this.bgMaterial = new o.jyz({
                        uniforms: {
                            color1: {
                                value: new o.Ilk(this.settings.backgroundColor1)
                            },
                            color2: {
                                value: new o.Ilk(this.settings.backgroundColor2)
                            }
                        },
                        vertexShader: "precision highp float;\nprecision mediump int;\n#define GLSLIFY 1\n\nvarying vec2 vUv;\n\nvoid main()	{\n  vUv = uv;\n  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
                        fragmentShader: "precision highp float;\nprecision mediump int;\n#define GLSLIFY 1\n\nvarying vec2 vUv;\n\nuniform vec3 color1;\nuniform vec3 color2;\n\nvoid main() {\n	vec3 color = mix(color1, color2, vUv.y);\n	gl_FragColor = vec4(color,1.0);\n}\n"
                    });
                    let e = new o.Kj0(new o._12(100, 100, 1, 1), this.bgMaterial);
                    this.backPlane = e, e.position.z = -105, this.camera.add(e)
                }
                async loadAsset(e) {
                    this.experience.assetManager.unloadNamespace("streamnode-content"), "" !== e && void 0 !== e && (this.currentAssetUrl = e, e.includes(".jpg") || e.includes(".png") ? await this.loadImage(e) : e.includes(".mp4") ? await this.loadVideo(e) : e.includes(".glb") || e.includes(".gltf") || e.includes(".ply") ? await this.loadModel(e) : e.includes(".dow") && await this.loadDow(e))
                }
                async loadImage(e) {
                    let t = e.startsWith("https") ? e : L + e;
                    return e.startsWith("blob") && (t = e), new Promise((e, i) => {
                        this.experience.assetManager.loadManifest([{
                            key: t,
                            url: t
                        }], "streamnode-content").then(() => {
                            this.processTexture(t), e()
                        }).catch(() => {
                            i()
                        })
                    })
                }
                async loadVideo(e) {
                    let t = e.startsWith("https") ? e : j + e;
                    return e.startsWith("blob") && (t = e), new Promise((e, i) => {
                        this.experience.assetManager.loadManifest([{
                            key: t,
                            url: t
                        }], "streamnode-content").then(() => {
                            this.processVideo(t), e()
                        }).catch(() => {
                            i()
                        })
                    })
                }
                async loadModel(e) {
                    let t = e.startsWith("https") ? e : B + e;
                    return e.startsWith("blob") && (t = e), new Promise((e, i) => {
                        this.experience.assetManager.loadManifest([{
                            key: t,
                            url: t
                        }], "streamnode-content").then(() => {
                            this.processModel(t), e()
                        }).catch(() => {
                            i()
                        })
                    })
                }
                async loadDow(e) {
                    let t = e.startsWith("https") ? e : Y + e;
                    return new Promise((e, i) => {
                        this.experience.assetManager.loadManifest([{
                            key: t,
                            url: t
                        }], "streamnode-content").then(() => {
                            e(), this.processTexture(t.replace("dow", "jpg")), this.processTexture(t.replace("dow", "png")), this.processVideo(t.replace("dow", "mp4")), this.processModel(t.replace("dow", "glb"))
                        }).catch(() => {
                            i()
                        })
                    })
                }
                analyseModel(e) {
                    let t = this.experience.assetManager.getModel(e);
                    if (t) {
                        t.userData.isDraco || this.addAssetWarning("Model is not compressed, consider tick that checkbox in Blender"), t.userData.hasAnimations && this.addAssetWarning("Model has animations (not supported), remove them to save space."), t.userData.biggestTexture > 1024 && this.addAssetWarning("Model has big texture (".concat(t.userData.biggestTexture, "), consider reduce size")), 2 !== t.children.length && this.addAssetWarning("model should just contain 2 children");
                        let e = t.getObjectByName("model_full");
                        if (e) {
                            if (e.children.length > 0 && this.addAssetWarning("model_full can have children but it can affect performance"), e.children.length > 7 && this.addAssetWarning("model_full have many children, might affect performance"), e.children.length > 1) {
                                let t = e.children.map(e => e.name.split("_")[0]),
                                    i = 0,
                                    n = "";
                                t.forEach(e => {
                                    e === n && i++, n = e
                                }), this.addAssetWarning("model_full is split into ".concat(i, " meshes because of different materials"))
                            }
                            if (e.isMesh) {
                                let t = e.material;
                                (t.roughnessMap || t.metalnessMap || t.normalMap) && this.addAssetWarning("Rendering supports roughness/metallic/normal, but consider using baked diffuse map if that is enough"), e.scale.x < 0 && e.scale.y < 0 && e.scale.z < 0 && this.addAssetWarning("Model scale is inverted")
                            }
                        } else this.addAssetWarning("model missing a mesh called model_full in the root");
                        t.getObjectByName("model_wireframe") || this.addAssetWarning("model missing a mesh called model_wireframe in the root")
                    }
                }
                addAssetWarning(e) {
                    let t = [...y.h.getState().assetWarnings];
                    t.push(e), y.h.setState({
                        assetWarnings: t
                    })
                }
                clearAssetWarning() {
                    y.h.getState().api.set({
                        assetWarnings: []
                    })
                }
                update(e, t) {
                    if (this.isDestroyed) return;
                    this.time = e, this.totalProgress > .9 || this.isDecryptionMode ? (this.controls.enabled = !0, this.controls.maxPolarAngle += (.6 * Math.PI - this.controls.maxPolarAngle) * .1, this.controls.minPolarAngle += (.3 * Math.PI - this.controls.minPolarAngle) * .1, this.controls.maxAzimuthAngle += (.1 * Math.PI - this.controls.maxAzimuthAngle) * .1, this.controls.minAzimuthAngle += (-.1 * Math.PI - this.controls.minAzimuthAngle) * .1) : (this.controls.enabled = !1, this.controls.maxPolarAngle += (.5 * Math.PI - this.controls.maxPolarAngle) * .1, this.controls.minPolarAngle += (.5 * Math.PI - this.controls.minPolarAngle) * .1, this.controls.maxAzimuthAngle += (0 - this.controls.maxAzimuthAngle) * .1, this.controls.minAzimuthAngle += (0 - this.controls.minAzimuthAngle) * .1);
                    let i = this.controls.velocity;
                    this.postEffectManager.setScrollAmount(i * (this.controls.isControlling() ? 1 : 0)), this.controls.update(), this.activeEffects.forEach(e => {
                        e.update(this.time * this.settingsUI.shared.globalTimescale, t), e.lookAtCamera ? e.group.lookAt(this.camera.position) : e.group.rotation.set(0, 0, 0)
                    }), this.postEffectManager.render(this.time, t)
                }
                dispose() {
                    this.unsubscribeToStoreFunction && this.unsubscribeToStoreFunction(), this.experience.sizes.clearElementReference(), this.experience.sizes.off("resize", this.onResizeHandler), super.dispose(), this.controls.dispose(), this.isDestroyed = !0, this.postEffectManager && this.postEffectManager.dispose && this.postEffectManager.dispose(), this.settingsFolder && (this.settingsFolder.children.forEach(e => {
                        e.dispose()
                    }), this.settingsFolder.dispose()), this.settingsUI.onSettingsUpdated.removeAll(), this.settingsUI.onSettingsReset.removeAll(), this.activeEffects.forEach(e => {
                        e.destroy()
                    })
                }
                constructor(e) {
                    super(e), this.cameraTarget = new o.Pa4, this.isDestroyed = !1, this.time = 0, this.activeEffects = [], this.totalProgress = 0, this.isDecryptionMode = !1, this.onStoreStateChanged = () => {
                        let e = y.h.getState();
                        e.effectPresetName !== this.currentEffectPresetName && this.settingsUI.setPreset(e.effectPresetName), (this.currentAssetUrl !== e.assetUrl || this.currentEffectPresetName !== e.effectPresetName) && this.loadAsset(e.assetUrl).then(() => N.Z.emit(N.F.WEBGL_ASSET_LOADED, {
                            assetUrl: e.assetUrl
                        })).catch(() => {
                            N.Z.emit(N.F.WEBGL_ASSET_LOAD_ERROR, {
                                assetUrl: e.assetUrl
                            })
                        }), this.currentEffectPresetName = e.effectPresetName, this.isDecryptionMode || (this.totalProgress = e.totalProgress, this.postEffectManager && (this.postEffectManager.setProgress(this.totalProgress), this.postEffectManager.updateChannelTimeline(0, e.channel1 * this.totalProgress), this.postEffectManager.updateChannelTimeline(1, e.channel2 * this.totalProgress), this.postEffectManager.updateChannelTimeline(2, e.channel3 * this.totalProgress), this.postEffectManager.updateChannelTimeline(3, e.channel4 * this.totalProgress)), this.activeEffects.forEach(t => {
                            t.updateChannelTimeline(0, e.channel1 * this.totalProgress), t.updateChannelTimeline(1, e.channel2 * this.totalProgress), t.updateChannelTimeline(2, e.channel3 * this.totalProgress), t.updateChannelTimeline(3, e.channel4 * this.totalProgress)
                        })), this.experience.debug.isActive && this.settingsUI.pane.refresh()
                    }, this.onTrigger = e => {
                        if (e.type === y.zn.DecryptedStart) {
                            if (this.totalProgress < 1) {
                                let e = {
                                    progress: this.totalProgress
                                };
                                f.ZP.to(e, {
                                    progress: 1,
                                    duration: 1,
                                    ease: x.Yv.easeIn,
                                    onUpdate: () => {
                                        this.totalProgress = e.progress, this.postEffectManager && (this.postEffectManager.setProgress(e.progress), this.postEffectManager.updateChannelTimeline(0, e.progress), this.postEffectManager.updateChannelTimeline(1, e.progress), this.postEffectManager.updateChannelTimeline(2, e.progress), this.postEffectManager.updateChannelTimeline(3, e.progress)), this.activeEffects.forEach(t => {
                                            t.updateChannelTimeline(0, e.progress), t.updateChannelTimeline(1, e.progress), t.updateChannelTimeline(2, e.progress), t.updateChannelTimeline(3, e.progress)
                                        })
                                    },
                                    onComplete: () => {
                                        this.gotoDecrypted()
                                    }
                                })
                            } else this.gotoDecrypted()
                        } else if (e.type === y.zn.DecryptedEnd) {
                            this.settingsUI.setPreset(y.h.getState().effectPresetName);
                            let e = {
                                progress: 1
                            };
                            f.ZP.to(e, {
                                progress: 0,
                                duration: 1,
                                ease: x.Yv.easeIn,
                                onUpdate: () => {
                                    this.totalProgress = e.progress, this.postEffectManager && (this.postEffectManager.setProgress(e.progress), this.postEffectManager.updateChannelTimeline(0, e.progress), this.postEffectManager.updateChannelTimeline(1, e.progress), this.postEffectManager.updateChannelTimeline(2, e.progress), this.postEffectManager.updateChannelTimeline(3, e.progress)), this.activeEffects.forEach(t => {
                                        t.updateChannelTimeline(0, e.progress), t.updateChannelTimeline(1, e.progress), t.updateChannelTimeline(2, e.progress), t.updateChannelTimeline(3, e.progress)
                                    })
                                },
                                onComplete: () => {
                                    this.postEffectManager.reduceColorsToZero().then(() => {
                                        y.h.getState().api.trigger.invoke({
                                            type: y.zn.DecryptedEndComplete
                                        }), this.isDecryptionMode = !1, this.postEffectManager.endDecryptionMode()
                                    })
                                }
                            })
                        }
                    }, this.applySettings = () => {
                        this.bgMaterial && (this.bgMaterial.uniforms.color1.value.set(this.settings.backgroundColor1), this.bgMaterial.uniforms.color2.value.set(this.settings.backgroundColor2))
                    }, this.processTexture = e => {
                        let t = this.experience.assetManager.getTexture(e);
                        if (t) {
                            this.experience.debug.isActive && (t.source.data.width > 1024 || t.source.data.height > 1024) && this.addAssetWarning("Image is over ".concat(t.source.data.width, "px. It’s downsampled to 1024 in the experience anyways"));
                            let i = document.createElement("canvas"),
                                n = i.getContext("2d");
                            i.width = 1024, i.height = 1024, this.drawImageScaled(t.source.data, n);
                            let s = new o.ROQ(i);
                            s.colorSpace = o.KI_, this.experience.assetManager.removeTexture(e), this.experience.assetManager.addTexture(e, s, "streamnode-content"), this.activeEffects.forEach(t => {
                                t.setSource(e), t.setSourceTextureAspect(1)
                            })
                        }
                    }, this.drawImageScaled = (e, t) => {
                        let i = t.canvas,
                            n = Math.min(i.width / e.width, i.height / e.height),
                            s = (i.width - e.width * n) / 2,
                            a = (i.height - e.height * n) / 2;
                        t.fillStyle = "rgba(0, 0, 0, 0)", t.clearRect(0, 0, i.width, i.height), t.drawImage(e, 0, 0, e.width, e.height, s, a, e.width * n, e.height * n)
                    }, this.processVideo = e => {
                        let t = this.experience.assetManager.getVideo(e);
                        if (t) {
                            let i = t.source.data.videoWidth / t.source.data.videoHeight;
                            this.activeEffects.forEach(t => {
                                t.setSource(e), t.setSourceTextureAspect(i)
                            })
                        }
                    }, this.processModel = e => {
                        this.experience.debug.isActive && this.analyseModel(e);
                        let t = this.experience.assetManager.getModel(e);
                        t && this.activeEffects.forEach(t => {
                            t.setSource(e)
                        })
                    }, this.onResizeHandler = () => {
                        let e = Math.ceil(this.experience.sizes.width),
                            t = Math.ceil(this.experience.sizes.height);
                        this.camera.aspect = e / t, this.camera.updateProjectionMatrix(), a.Z.getRenderer().setSize(e, t), this.postEffectManager.resize(e, t), this.activeEffects.forEach(e => {
                            e.resize(this.experience.sizes)
                        }), this.backPlane.scale.set(e / 1e3, t / 1e3, 1), this.backPlane.position.z = -(.1 * t) / (2 * Math.tan(this.camera.fov * (Math.PI / 360)))
                    }, this.camera = new o.cPb(40, window.innerWidth / window.innerHeight, .1, 300), this.scene = new o.xsS;
                    let t = document.getElementById("webglInputElement");
                    this.controls = new l(this.camera, t || a.Z.getRenderer().domElement), this.controls.target.copy(this.cameraTarget), this.controls.enableDamping = !1, this.controls.dampingFactor = .1, this.controls.enableRotate = !0, this.controls.enablePan = !1, this.controls.enableZoom = !0, this.controls.screenSpacePanning = !1, this.controls.maxPolarAngle = .95 * Math.PI, this.controls.minPolarAngle = .05 * Math.PI, this.controls.maxAzimuthAngle = .45 * Math.PI, this.controls.minAzimuthAngle = -.45 * Math.PI, this.controls.minDistance = 2, this.controls.maxDistance = 4, this.scene = new o.xsS, this.scene.background = new o.Ilk(0), this.scene.add(this.camera), this.camera.lookAt(this.cameraTarget), this.experience.sizes.registerElement(a.Z.getRenderer().domElement.parentElement), this.experience.sizes.on("resize", this.onResizeHandler), this.defaultSettings = {
                        animateCamera: !0,
                        backgroundColor1: "#000000",
                        backgroundColor2: "#000000",
                        cameraZ: 4,
                        ambientIntensity: 5,
                        directionalIntensity: .2
                    }, this.settings = JSON.parse(JSON.stringify(this.defaultSettings)), this.dirLight = new o.Ox3(16777215, this.settings.directionalIntensity), this.dirLight.position.x = -2, this.dirLight.position.y = 5, this.camera.add(this.dirLight), this.ambientLight = new o.vmT(16777215, 13421772, this.settings.ambientIntensity), this.scene.add(this.ambientLight), this.camera.position.z = this.settings.cameraZ, this.createBackground(), this.postEffectManager = new b(a.Z.getRenderer()), this.postEffectManager.setSceneAndCamera(this.scene, this.camera), y.h.getState().api.trigger.add(this.onTrigger), this.onResizeHandler(), this.experience.debug.isActive && this.initDragAndDrop()
                }
            }
        },
        0: function (e, t, i) {
            i.d(t, {
                Q: function () {
                    return o
                }
            });
            var n = i(8174),
                s = i(6461),
                a = i(2182);
            class o {
                get name() {
                    return this.config.id
                }
                load() {
                    let {
                        debounce: e
                    } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    this.isLoaded = !1;
                    let t = (0, s.hj)(e) ? (0, a.D)(e) : Promise.resolve(),
                        i = this.experience.assetManager.loadManifest(this.config.assetsManifest, this.config.id);
                    return new Promise((e, n) => {
                        Promise.all([t, i]).then(() => {
                            this.isLoaded = !0, e()
                        }).catch(e => {
                            n(e)
                        })
                    })
                }
                beforeTransitionIn() {
                    return Promise.resolve()
                }
                afterTransitionIn() {
                    return Promise.resolve()
                }
                beforeTransitionOut() {
                    return Promise.resolve()
                }
                afterTransitionOut() {
                    return Promise.resolve()
                }
                addEventListeners() {}
                removeEventListeners() {}
                resize() {
                    if (!this.isLoaded) return
                }
                _bind() {
                    for (var e = arguments.length, t = Array(e), i = 0; i < e; i++) t[i] = arguments[i];
                    for (let e of t) {
                        if (!this[e]) throw Error("The function ".concat(e, " is not defined"));
                        this[e] = this[e].bind(this)
                    }
                }
                dispose() {
                    this.removeEventListeners();
                    let e = [];
                    for (this.scene.traverse(t => {
                            e.push(t)
                        }), e.forEach(e => {
                            e.material && (Object.keys(e.material).forEach(t => {
                                e.material[t] && null !== e.material[t] && "function" == typeof e.material[t].dispose && e.material[t].dispose()
                            }), e.material.dispose()), e.geometry && e.geometry.dispose()
                        }); this.scene.children.length > 0;) this.scene.remove(this.scene.children[0]);
                    this.experience.assetManager.unloadNamespace(this.config.id)
                }
                constructor(e) {
                    this.isLoaded = !1, this.config = e, this.experience = new n.default
                }
            }
        },
        6090: function (e, t, i) {
            i.d(t, {
                Z: function () {
                    return h
                },
                a: function () {
                    return s
                }
            });
            var n, s, a = i(29),
                o = i(7172),
                r = i(8174);
            let l = "default";
            (n = s || (s = {})).All = "all", n.None = "none", n.Plane = "plane", n.Ascii = "ascii", n.Columns = "columns", n.Stream = "stream", n.Post = "post", n.Grid = "grid", n.PointCloud = "point-cloud", n.Lines = "lines", n.SurfaceQuads = "surface-quads", n.BackgroundQuads = "background-quads", n.SurfaceAscii = "surface-ascii", n.LandingNoise = "landing-noise", n.LandingQuads = "landingquads";
            let c = null;
            class h {
                reset() {
                    this.resetToDefault(), this.onSettingsUpdated.removeAll(), this.onSharedUpdated.removeAll(), this.onSettingsReset.removeAll()
                }
                initPresetSettings() {
                    Object.keys(o.Z)
                }
                setPreset() {
                    let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : l,
                        t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                    (this.currentPresetName !== e || t) && (this.currentPresetName = e, this.resetToDefault(), Object.keys(o.Z).includes(e) ? this.applyPresetSettings(o.Z[e]) : this.applyPresetSettings(o.Z[l]))
                }
                initSharedUI() {
                    this.pane.addBinding(this.shared, "globalTimescale", {
                        min: 0,
                        max: 4
                    }).on("change", () => {
                        this.onSharedUpdated.invoke()
                    })
                }
                applyPresetSettings(e) {
                    Object.keys(e).forEach(t => {
                        this.onSettingsUpdated.invoke({
                            type: t,
                            settings: e[t]
                        })
                    }), this.onSettingsUpdated.invoke({
                        type: s.All,
                        settings: e
                    }), this.debug.isActive && this.pane.refresh()
                }
                resetToDefault() {
                    this.onSettingsReset.invoke(), this.debug.isActive && this.pane.refresh()
                }
                setGlobalStrength(e) {
                    this.shared.globalStrength = e, this.onSharedUpdated.invoke(), this.debug.isActive && this.globalStrengthController && this.globalStrengthController.refresh()
                }
                getElement() {
                    return this.pane.element
                }
                constructor() {
                    if (this.shared = {
                            globalStrength: 1,
                            globalTimescale: 1
                        }, this.onSharedUpdated = new a.Z, this.onSettingsUpdated = new a.Z, this.onSettingsReset = new a.Z, this.onSettingsSolo = new a.Z, c) return c;
                    c = this;
                    let e = new r.default;
                    this.debug = e.debug, this.pane = this.debug.pane, this.debug.isActive && (this.initPresetSettings(), this.initSharedUI())
                }
            }
        }
    }
]);