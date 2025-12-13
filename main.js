(self["webpackChunkmbam"] = self["webpackChunkmbam"] || []).push([["main"],{

/***/ 92:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppComponent: () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 2481);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 5422);
/* harmony import */ var _components_nav_bar_nav_bar_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/nav-bar/nav-bar.component */ 1977);
/* harmony import */ var _components_footer_footer_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/footer/footer.component */ 5473);




class AppComponent {
  constructor() {
    this.title = 'Manitoba Master Bowlers';
  }
  static {
    this.ɵfac = function AppComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || AppComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: AppComponent,
      selectors: [["app-root"]],
      standalone: false,
      decls: 5,
      vars: 0,
      consts: [[1, "d-flex", "flex-column", "h-100"], [1, "container"]],
      template: function AppComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "app-nav-bar");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "router-outlet");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "app-footer");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }
      },
      dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterOutlet, _components_nav_bar_nav_bar_component__WEBPACK_IMPORTED_MODULE_2__.NavBarComponent, _components_footer_footer_component__WEBPACK_IMPORTED_MODULE_3__.FooterComponent],
      styles: [".container[_ngcontent-%COMP%] {\n    margin-left: 0;\n    margin-right: 0;\n    padding-bottom: 50px;\n    margin-bottom: 50px;\n    max-width: 100%;\n    width: 100%;\n    height: 100%;\n    overflow: auto;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvYXBwLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxjQUFjO0lBQ2QsZUFBZTtJQUNmLG9CQUFvQjtJQUNwQixtQkFBbUI7SUFDbkIsZUFBZTtJQUNmLFdBQVc7SUFDWCxZQUFZO0lBQ1osY0FBYztBQUNsQiIsInNvdXJjZXNDb250ZW50IjpbIi5jb250YWluZXIge1xuICAgIG1hcmdpbi1sZWZ0OiAwO1xuICAgIG1hcmdpbi1yaWdodDogMDtcbiAgICBwYWRkaW5nLWJvdHRvbTogNTBweDtcbiAgICBtYXJnaW4tYm90dG9tOiA1MHB4O1xuICAgIG1heC13aWR0aDogMTAwJTtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgb3ZlcmZsb3c6IGF1dG87XG59Il0sInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ }),

/***/ 154:
/*!************************************************!*\
  !*** ./src/app/services/permission.service.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PERMISSION: () => (/* binding */ PERMISSION),
/* harmony export */   PermissionService: () => (/* binding */ PermissionService)
/* harmony export */ });
/* harmony import */ var jwt_decode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jwt-decode */ 4751);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 271);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 4205);
/* harmony import */ var _auth0_auth0_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @auth0/auth0-angular */ 7989);




var PERMISSION;
(function (PERMISSION) {
  PERMISSION["EDIT_TOURNAMENT"] = "edit:tournament";
  PERMISSION["READ_SITEMAP"] = "read:sitemap";
})(PERMISSION || (PERMISSION = {}));
class PermissionService {
  constructor(auth) {
    this.auth = auth;
  }
  checkPermission(permission) {
    return this.auth.getAccessTokenSilently().pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.map)(token => {
      let decoded = (0,jwt_decode__WEBPACK_IMPORTED_MODULE_0__.jwtDecode)(token);
      console.log('permissions', decoded?.['permissions'] || []);
      return (decoded?.['permissions'] || []).indexOf(permission) >= 0;
    }));
  }
  static {
    this.ɵfac = function PermissionService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || PermissionService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_auth0_auth0_angular__WEBPACK_IMPORTED_MODULE_3__.AuthService));
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
      token: PermissionService,
      factory: PermissionService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ }),

/***/ 209:
/*!****************************************!*\
  !*** ./src/app/models/SeasonRecord.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SeasonRecord: () => (/* binding */ SeasonRecord)
/* harmony export */ });
class SeasonRecord {}

/***/ }),

/***/ 227:
/*!*******************************************************************************!*\
  !*** ./src/app/components/tournament-summary/tournament-summary.component.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TournamentSummaryComponent: () => (/* binding */ TournamentSummaryComponent)
/* harmony export */ });
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/material/sort */ 2047);
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/table */ 78);
/* harmony import */ var _models_SeasonSummaryRecord__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @models/SeasonSummaryRecord */ 6447);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 1873);
/* harmony import */ var _utils_export_to_csv__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/export-to-csv */ 8561);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2481);
/* harmony import */ var _services_api_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @services/api.service */ 3366);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 3683);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ 4487);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/form-field */ 8388);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/select */ 8724);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/select */ 6060);













const _c0 = a0 => ["/bowlers", a0];
function TournamentSummaryComponent_mat_option_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "mat-option", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const gender_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("value", gender_r1.value);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](gender_r1.name);
  }
}
function TournamentSummaryComponent_th_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "th", 30);
  }
}
function TournamentSummaryComponent_td_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "td", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const i_r2 = ctx.index;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](i_r2 + 1);
  }
}
function TournamentSummaryComponent_th_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "th", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, " Name ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function TournamentSummaryComponent_td_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "td", 31)(1, "a", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const element_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpureFunction1"](2, _c0, element_r3.BowlerId));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](element_r3.Bowler);
  }
}
function TournamentSummaryComponent_th_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "th", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, "1");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function TournamentSummaryComponent_td_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "td", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const element_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](element_r4.Scratch1);
  }
}
function TournamentSummaryComponent_th_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "th", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, "2");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function TournamentSummaryComponent_td_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "td", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const element_r5 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](element_r5.Scratch2);
  }
}
function TournamentSummaryComponent_th_23_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "th", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, "3");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function TournamentSummaryComponent_td_24_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "td", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const element_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](element_r6.Scratch3);
  }
}
function TournamentSummaryComponent_th_26_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "th", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, "4");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function TournamentSummaryComponent_td_27_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "td", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const element_r7 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](element_r7.Scratch4);
  }
}
function TournamentSummaryComponent_th_29_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "th", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, "5");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function TournamentSummaryComponent_td_30_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "td", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const element_r8 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](element_r8.Scratch5);
  }
}
function TournamentSummaryComponent_th_32_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "th", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, "6");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function TournamentSummaryComponent_td_33_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "td", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const element_r9 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](element_r9.Scratch6);
  }
}
function TournamentSummaryComponent_th_35_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "th", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, "Top 4");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function TournamentSummaryComponent_td_36_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "td", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const element_r10 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](element_r10.topNScratch(4));
  }
}
function TournamentSummaryComponent_th_38_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "th", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, "Top 3");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function TournamentSummaryComponent_td_39_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "td", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const element_r11 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](element_r11.topNScratch(3));
  }
}
function TournamentSummaryComponent_th_41_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "th", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, "1");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function TournamentSummaryComponent_td_42_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "td", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](2, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const element_r12 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](element_r12.POA1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](element_r12.Scratch1);
  }
}
function TournamentSummaryComponent_th_44_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "th", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, "2");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function TournamentSummaryComponent_td_45_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "td", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](2, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const element_r13 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](element_r13.POA2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](element_r13.Scratch2);
  }
}
function TournamentSummaryComponent_th_47_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "th", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, "3");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function TournamentSummaryComponent_td_48_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "td", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](2, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const element_r14 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](element_r14.POA3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](element_r14.Scratch3);
  }
}
function TournamentSummaryComponent_th_50_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "th", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, "4");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function TournamentSummaryComponent_td_51_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "td", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](2, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const element_r15 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](element_r15.POA4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](element_r15.Scratch4);
  }
}
function TournamentSummaryComponent_th_53_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "th", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, "5");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function TournamentSummaryComponent_td_54_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "td", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](2, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const element_r16 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](element_r16.POA5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](element_r16.Scratch5);
  }
}
function TournamentSummaryComponent_th_56_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "th", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, "6");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function TournamentSummaryComponent_td_57_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "td", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](2, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const element_r17 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](element_r17.POA6);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](element_r17.Scratch6);
  }
}
function TournamentSummaryComponent_th_59_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "th", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, "Top 4");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function TournamentSummaryComponent_td_60_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "td", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const element_r18 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](element_r18.topNPoa(4));
  }
}
function TournamentSummaryComponent_th_62_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "th", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, "Top 3");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function TournamentSummaryComponent_td_63_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "td", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const element_r19 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](element_r19.topNPoa(3));
  }
}
function TournamentSummaryComponent_tr_64_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "tr", 35);
  }
}
function TournamentSummaryComponent_tr_65_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "tr", 36);
  }
}
class TournamentSummaryComponent {
  constructor(api) {
    this.api = api;
    this.genderFilter = '';
    this.genders = [{
      value: '',
      name: 'All'
    }, {
      value: 'M',
      name: 'Mens'
    }, {
      value: 'L',
      name: 'Womens'
    }];
    this.displayedColumns = [];
    this.dataSource = new _angular_material_table__WEBPACK_IMPORTED_MODULE_1__.MatTableDataSource([]);
    this.tournamentSummary = [];
  }
  isTournament(division) {
    return "Tournament".localeCompare(division.toString(), undefined, {
      sensitivity: 'base'
    }) === 0;
  }
  ngOnChanges(_changes) {
    const scratchTotals = ['Scratch1', 'Scratch2', 'Scratch3', 'Scratch4', 'Scratch5', 'Scratch6'];
    const poaTotals = ['POA1', 'POA2', 'POA3', 'POA4', 'POA5', 'POA6'];
    const scratchColumns = ['Pos', 'Bowler', ...scratchTotals, 'Top4Scratch', 'Top3Scratch'];
    const poaColumns = ['Pos', 'Bowler', ...poaTotals, 'Top4POA', 'Top3POA'];
    this.isTournament(this.division) ? this.displayedColumns = scratchColumns : this.displayedColumns = poaColumns;
    this.api.tournaments$().subscribe(tournaments => {
      this.tournaments = tournaments.filter(x => x.Division.localeCompare(this.division, undefined, {
        sensitivity: 'base'
      }) === 0).filter(x => x.SeasonCode === this.season);
      this.tournaments.sort((x, y) => x.TournamentNumber - y.TournamentNumber);
      const records = [];
      (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.forkJoin)([...this.tournaments.map(tournament => this.api.tournamentResults$(tournament.Id))]).subscribe(resultsList => {
        resultsList.forEach(results => {
          const tournament = this.tournaments.find(x => x.Id === results[0]?.TournamentId);
          if (!tournament) return;
          results
          //.filter(x => !this.genderFilter || x.Gender.localeCompare(this.genderFilter, undefined, {sensitivity: 'base'}) === 0)
          .forEach(x => {
            const existingRecord = records.find(z => z.BowlerId === x.BowlerId);
            if (existingRecord) {
              existingRecord[`Scratch${tournament.TournamentNumber}`] = x.scratch();
              existingRecord[`POA${tournament.TournamentNumber}`] = x.poa();
            } else {
              records.push(Object.assign(new _models_SeasonSummaryRecord__WEBPACK_IMPORTED_MODULE_2__.SeasonSummaryRecord(), {
                ...records[x.BowlerId],
                BowlerId: x.BowlerId,
                Bowler: x.Bowler,
                Gender: x.Gender,
                [`Scratch${tournament.TournamentNumber}`]: x.scratch(),
                [`POA${tournament.TournamentNumber}`]: x.poa()
              }).ensureTypes());
            }
          });
        });
        this.tournamentSummary = records;
        this.dataSource.data = this.tournamentSummary;
      });
    });
  }
  ngAfterViewInit() {
    this.resort();
  }
  filterData() {
    this.dataSource.data = this.tournamentSummary.filter(x => !this.genderFilter || x.Gender.localeCompare(this.genderFilter, undefined, {
      sensitivity: 'base'
    }) === 0);
  }
  resort() {
    this.isTournament(this.division) ? this.sort.sort({
      id: 'Top4Scratch',
      start: 'desc'
    }) : this.sort.sort({
      id: 'Top4POA',
      start: 'desc'
    });
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property.toLocaleLowerCase()) {
        case 'top3scratch':
          return item.topNScratch(3);
        case 'top4scratch':
          return item.topNScratch(4);
        case 'top3poa':
          return item.topNPoa(3);
        case 'top4poa':
          return item.topNPoa(4);
        default:
          return item[property];
      }
    };
  }
  exportCsv() {
    const rows = this.dataSource.filteredData?.length ? this.dataSource.filteredData : this.dataSource.data;
    (0,_utils_export_to_csv__WEBPACK_IMPORTED_MODULE_4__.exportToCsv)('tournament-summary.csv', this.displayedColumns, rows);
  }
  static {
    this.ɵfac = function TournamentSummaryComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || TournamentSummaryComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_services_api_service__WEBPACK_IMPORTED_MODULE_6__.ApiService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
      type: TournamentSummaryComponent,
      selectors: [["app-tournament-summary"]],
      viewQuery: function TournamentSummaryComponent_Query(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵviewQuery"](_angular_material_sort__WEBPACK_IMPORTED_MODULE_0__.MatSort, 5);
        }
        if (rf & 2) {
          let _t;
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵloadQuery"]()) && (ctx.sort = _t.first);
        }
      },
      inputs: {
        division: "division",
        season: "season"
      },
      standalone: false,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵNgOnChangesFeature"]],
      decls: 66,
      vars: 7,
      consts: [["id", "exports", 1, "justify"], [3, "valueChange", "selectionChange", "value"], [3, "value", 4, "ngFor", "ngForOf"], ["id", "csv", 1, "btn", "btn-success", 3, "click"], ["mat-table", "", "matSort", "", 1, "mat-elevation-z8", 3, "dataSource"], ["matColumnDef", "Pos"], ["mat-header-cell", "", "mat-sort-header", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "Bowler"], ["matColumnDef", "Scratch1"], ["mat-header-cell", "", "mat-sort-header", "", "start", "desc", "width", "5em", 4, "matHeaderCellDef"], ["matColumnDef", "Scratch2"], ["matColumnDef", "Scratch3"], ["matColumnDef", "Scratch4"], ["matColumnDef", "Scratch5"], ["matColumnDef", "Scratch6"], ["matColumnDef", "Top4Scratch"], ["mat-header-cell", "", "mat-sort-header", "", "start", "desc", "width", "120px", 4, "matHeaderCellDef"], ["matColumnDef", "Top3Scratch"], ["matColumnDef", "POA1"], ["matColumnDef", "POA2"], ["matColumnDef", "POA3"], ["matColumnDef", "POA4"], ["matColumnDef", "POA5"], ["matColumnDef", "POA6"], ["matColumnDef", "Top4POA"], ["matColumnDef", "Top3POA"], ["mat-header-row", "", 4, "matHeaderRowDef", "matHeaderRowDefSticky"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], [3, "value"], ["mat-header-cell", "", "mat-sort-header", ""], ["mat-cell", ""], [3, "routerLink"], ["mat-header-cell", "", "mat-sort-header", "", "start", "desc", "width", "5em"], ["mat-header-cell", "", "mat-sort-header", "", "start", "desc", "width", "120px"], ["mat-header-row", ""], ["mat-row", ""]],
      template: function TournamentSummaryComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 0)(1, "mat-label");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "mat-select", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayListener"]("valueChange", function TournamentSummaryComponent_Template_mat_select_valueChange_3_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayBindingSet"](ctx.genderFilter, $event) || (ctx.genderFilter = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("selectionChange", function TournamentSummaryComponent_Template_mat_select_selectionChange_3_listener() {
            return ctx.filterData();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](4, TournamentSummaryComponent_mat_option_4_Template, 2, 2, "mat-option", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "span");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](6, "\u00A0");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](7, "button", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function TournamentSummaryComponent_Template_button_click_7_listener() {
            return ctx.exportCsv();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](8, "Export as CSV");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](9, "table", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](10, 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](11, TournamentSummaryComponent_th_11_Template, 1, 0, "th", 6)(12, TournamentSummaryComponent_td_12_Template, 2, 1, "td", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](13, 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](14, TournamentSummaryComponent_th_14_Template, 2, 0, "th", 6)(15, TournamentSummaryComponent_td_15_Template, 3, 4, "td", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](16, 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](17, TournamentSummaryComponent_th_17_Template, 2, 0, "th", 10)(18, TournamentSummaryComponent_td_18_Template, 2, 1, "td", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](19, 11);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](20, TournamentSummaryComponent_th_20_Template, 2, 0, "th", 10)(21, TournamentSummaryComponent_td_21_Template, 2, 1, "td", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](22, 12);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](23, TournamentSummaryComponent_th_23_Template, 2, 0, "th", 10)(24, TournamentSummaryComponent_td_24_Template, 2, 1, "td", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](25, 13);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](26, TournamentSummaryComponent_th_26_Template, 2, 0, "th", 10)(27, TournamentSummaryComponent_td_27_Template, 2, 1, "td", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](28, 14);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](29, TournamentSummaryComponent_th_29_Template, 2, 0, "th", 10)(30, TournamentSummaryComponent_td_30_Template, 2, 1, "td", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](31, 15);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](32, TournamentSummaryComponent_th_32_Template, 2, 0, "th", 10)(33, TournamentSummaryComponent_td_33_Template, 2, 1, "td", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](34, 16);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](35, TournamentSummaryComponent_th_35_Template, 2, 0, "th", 17)(36, TournamentSummaryComponent_td_36_Template, 2, 1, "td", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](37, 18);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](38, TournamentSummaryComponent_th_38_Template, 2, 0, "th", 17)(39, TournamentSummaryComponent_td_39_Template, 2, 1, "td", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](40, 19);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](41, TournamentSummaryComponent_th_41_Template, 2, 0, "th", 10)(42, TournamentSummaryComponent_td_42_Template, 4, 2, "td", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](43, 20);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](44, TournamentSummaryComponent_th_44_Template, 2, 0, "th", 10)(45, TournamentSummaryComponent_td_45_Template, 4, 2, "td", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](46, 21);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](47, TournamentSummaryComponent_th_47_Template, 2, 0, "th", 10)(48, TournamentSummaryComponent_td_48_Template, 4, 2, "td", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](49, 22);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](50, TournamentSummaryComponent_th_50_Template, 2, 0, "th", 10)(51, TournamentSummaryComponent_td_51_Template, 4, 2, "td", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](52, 23);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](53, TournamentSummaryComponent_th_53_Template, 2, 0, "th", 10)(54, TournamentSummaryComponent_td_54_Template, 4, 2, "td", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](55, 24);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](56, TournamentSummaryComponent_th_56_Template, 2, 0, "th", 10)(57, TournamentSummaryComponent_td_57_Template, 4, 2, "td", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](58, 25);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](59, TournamentSummaryComponent_th_59_Template, 2, 0, "th", 17)(60, TournamentSummaryComponent_td_60_Template, 2, 1, "td", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](61, 26);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](62, TournamentSummaryComponent_th_62_Template, 2, 0, "th", 17)(63, TournamentSummaryComponent_td_63_Template, 2, 1, "td", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](64, TournamentSummaryComponent_tr_64_Template, 1, 0, "tr", 27)(65, TournamentSummaryComponent_tr_65_Template, 1, 0, "tr", 28);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("Gender - ", ctx.genderFilter);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayProperty"]("value", ctx.genderFilter);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx.genders);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("dataSource", ctx.dataSource);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](55);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("matHeaderRowDef", ctx.displayedColumns)("matHeaderRowDefSticky", true);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("matRowDefColumns", ctx.displayedColumns);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.NgForOf, _angular_router__WEBPACK_IMPORTED_MODULE_8__.RouterLink, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__.MatLabel, _angular_material_sort__WEBPACK_IMPORTED_MODULE_0__.MatSort, _angular_material_sort__WEBPACK_IMPORTED_MODULE_0__.MatSortHeader, _angular_material_select__WEBPACK_IMPORTED_MODULE_11__.MatSelect, _angular_material_select__WEBPACK_IMPORTED_MODULE_10__.MatOption, _angular_material_table__WEBPACK_IMPORTED_MODULE_1__.MatTable, _angular_material_table__WEBPACK_IMPORTED_MODULE_1__.MatHeaderCellDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_1__.MatHeaderRowDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_1__.MatColumnDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_1__.MatCellDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_1__.MatRowDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_1__.MatHeaderCell, _angular_material_table__WEBPACK_IMPORTED_MODULE_1__.MatCell, _angular_material_table__WEBPACK_IMPORTED_MODULE_1__.MatHeaderRow, _angular_material_table__WEBPACK_IMPORTED_MODULE_1__.MatRow],
      styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ }),

/***/ 547:
/*!****************************************!*\
  !*** ./src/app/models/BowlerRecord.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BowlerRecord: () => (/* binding */ BowlerRecord)
/* harmony export */ });
class BowlerRecord {}

/***/ }),

/***/ 635:
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppModule: () => (/* binding */ AppModule)
/* harmony export */ });
/* harmony import */ var _components_bowler_exists_validator_directive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/bowler-exists-validator.directive */ 3057);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ 2190);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 8418);
/* harmony import */ var ngx_highlightjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-highlightjs */ 7725);
/* harmony import */ var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @fortawesome/angular-fontawesome */ 7518);
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./app-routing.module */ 4114);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./app.component */ 92);
/* harmony import */ var _pages_home_home_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @pages/home/home.component */ 5047);
/* harmony import */ var _pages_profile_profile_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @pages/profile/profile.component */ 2683);
/* harmony import */ var _pages_error_error_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @pages/error/error.component */ 8939);
/* harmony import */ var _components_nav_bar_nav_bar_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/nav-bar/nav-bar.component */ 1977);
/* harmony import */ var _components_footer_footer_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/footer/footer.component */ 5473);
/* harmony import */ var _components_home_content_home_content_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components/home-content/home-content.component */ 1257);
/* harmony import */ var _components_loading_loading_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./components/loading/loading.component */ 8325);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/common/http */ 3855);
/* harmony import */ var _auth0_auth0_angular__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @auth0/auth0-angular */ 7989);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../environments/environment */ 5312);
/* harmony import */ var _components_upload_tournament_upload_tournament_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./components/upload-tournament/upload-tournament.component */ 4769);
/* harmony import */ var _pages_tournament_page_tournament_page_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @pages/tournament-page/tournament-page.component */ 4859);
/* harmony import */ var _components_tournament_editor_tournament_editor_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./components/tournament-editor/tournament-editor.component */ 5313);
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/platform-browser/animations */ 3835);
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/material/sort */ 2047);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/material/select */ 6060);
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/material/table */ 78);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/material/card */ 3777);
/* harmony import */ var _pipes_append_values_pipe__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./pipes/append-values.pipe */ 7287);
/* harmony import */ var _pages_tournament_upload_page_tournament_upload_page_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @pages/tournament-upload-page/tournament-upload-page.component */ 6699);
/* harmony import */ var _components_tournament_viewer_tournament_viewer_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./components/tournament-viewer/tournament-viewer.component */ 1529);
/* harmony import */ var _pages_bowler_page_bowler_page_component__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./pages/bowler-page/bowler-page.component */ 6379);
/* harmony import */ var _components_tournament_summary_tournament_summary_component__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./components/tournament-summary/tournament-summary.component */ 227);
/* harmony import */ var _components_bowler_results_bowler_results_component__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./components/bowler-results/bowler-results.component */ 1727);
/* harmony import */ var _components_bowler_stats_bowler_stats_component__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./components/bowler-stats/bowler-stats.component */ 6437);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! @angular/material/form-field */ 5759);
/* harmony import */ var _pages_schedule_page_schedule_page_component__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./pages/schedule-page/schedule-page.component */ 1383);
/* harmony import */ var _components_schedule_list_schedule_list_component__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./components/schedule-list/schedule-list.component */ 2397);
/* harmony import */ var _pages_tournament_edit_page_tournament_edit_page_component__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./pages/tournament-edit-page/tournament-edit-page.component */ 8893);
/* harmony import */ var _components_content_block_content_block_component__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./components/content-block/content-block.component */ 1913);
/* harmony import */ var _components_content_block_list_content_block_list_component__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./components/content-block-list/content-block-list.component */ 1255);
/* harmony import */ var _pages_content_blocks_page_content_blocks_page_component__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./pages/content-blocks-page/content-blocks-page.component */ 3663);
/* harmony import */ var _components_content_block_editor_content_block_editor_component__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./components/content-block-editor/content-block-editor.component */ 2349);
/* harmony import */ var _tinymce_tinymce_angular__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! @tinymce/tinymce-angular */ 5783);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! @angular/core */ 4205);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! @angular/core */ 2481);












































class AppModule {
  static {
    this.ɵfac = function AppModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || AppModule)();
    };
  }
  static {
    this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_43__["ɵɵdefineNgModule"]({
      type: AppModule,
      bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_7__.AppComponent]
    });
  }
  static {
    this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_42__["ɵɵdefineInjector"]({
      providers: [{
        provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_15__.HTTP_INTERCEPTORS,
        useClass: _auth0_auth0_angular__WEBPACK_IMPORTED_MODULE_16__.AuthHttpInterceptor,
        multi: true
      }, {
        provide: Window,
        useValue: window
      }, {
        provide: ngx_highlightjs__WEBPACK_IMPORTED_MODULE_4__.HIGHLIGHT_OPTIONS,
        useValue: {
          coreLibraryLoader: () => __webpack_require__.e(/*! import() */ "node_modules_highlight_js_es_core_js").then(__webpack_require__.bind(__webpack_require__, /*! highlight.js/lib/core */ 2885)),
          languages: {
            json: () => __webpack_require__.e(/*! import() */ "node_modules_highlight_js_es_languages_json_js").then(__webpack_require__.bind(__webpack_require__, /*! highlight.js/lib/languages/json */ 1428))
          }
        }
      }],
      imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__.BrowserModule, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormsModule, _app_routing_module__WEBPACK_IMPORTED_MODULE_6__.AppRoutingModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_15__.HttpClientModule, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__.NgbModule, ngx_highlightjs__WEBPACK_IMPORTED_MODULE_4__.HighlightModule, _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_5__.FontAwesomeModule, _auth0_auth0_angular__WEBPACK_IMPORTED_MODULE_16__.AuthModule.forRoot({
        ..._environments_environment__WEBPACK_IMPORTED_MODULE_17__.environment.auth,
        httpInterceptor: {
          ..._environments_environment__WEBPACK_IMPORTED_MODULE_17__.environment.httpInterceptor
        }
      }), _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_21__.BrowserAnimationsModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_33__.MatFormFieldModule, _angular_material_card__WEBPACK_IMPORTED_MODULE_25__.MatCardModule, _angular_material_sort__WEBPACK_IMPORTED_MODULE_22__.MatSortModule, _angular_material_select__WEBPACK_IMPORTED_MODULE_23__.MatSelectModule, _angular_material_table__WEBPACK_IMPORTED_MODULE_24__.MatTableModule, _tinymce_tinymce_angular__WEBPACK_IMPORTED_MODULE_41__.EditorModule]
    });
  }
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_43__["ɵɵsetNgModuleScope"](AppModule, {
    declarations: [_app_component__WEBPACK_IMPORTED_MODULE_7__.AppComponent, _pages_home_home_component__WEBPACK_IMPORTED_MODULE_8__.HomeComponent, _pages_profile_profile_component__WEBPACK_IMPORTED_MODULE_9__.ProfileComponent, _components_nav_bar_nav_bar_component__WEBPACK_IMPORTED_MODULE_11__.NavBarComponent, _components_footer_footer_component__WEBPACK_IMPORTED_MODULE_12__.FooterComponent, _components_home_content_home_content_component__WEBPACK_IMPORTED_MODULE_13__.HomeContentComponent, _components_loading_loading_component__WEBPACK_IMPORTED_MODULE_14__.LoadingComponent, _pages_error_error_component__WEBPACK_IMPORTED_MODULE_10__.ErrorComponent, _components_upload_tournament_upload_tournament_component__WEBPACK_IMPORTED_MODULE_18__.UploadTournamentComponent, _pages_tournament_page_tournament_page_component__WEBPACK_IMPORTED_MODULE_19__.TournamentPageComponent, _components_tournament_editor_tournament_editor_component__WEBPACK_IMPORTED_MODULE_20__.TournamentEditorComponent, _pipes_append_values_pipe__WEBPACK_IMPORTED_MODULE_26__.AppendValuesPipe, _pages_tournament_upload_page_tournament_upload_page_component__WEBPACK_IMPORTED_MODULE_27__.TournamentUploadPageComponent, _components_tournament_viewer_tournament_viewer_component__WEBPACK_IMPORTED_MODULE_28__.TournamentViewerComponent, _pages_bowler_page_bowler_page_component__WEBPACK_IMPORTED_MODULE_29__.BowlerPageComponent, _components_tournament_summary_tournament_summary_component__WEBPACK_IMPORTED_MODULE_30__.TournamentSummaryComponent, _components_bowler_exists_validator_directive__WEBPACK_IMPORTED_MODULE_0__.BowlerExistsValidatorDirective, _components_bowler_results_bowler_results_component__WEBPACK_IMPORTED_MODULE_31__.BowlerResultsComponent, _components_bowler_stats_bowler_stats_component__WEBPACK_IMPORTED_MODULE_32__.BowlerStatsComponent, _pages_schedule_page_schedule_page_component__WEBPACK_IMPORTED_MODULE_34__.SchedulePageComponent, _components_schedule_list_schedule_list_component__WEBPACK_IMPORTED_MODULE_35__.ScheduleListComponent, _pages_tournament_edit_page_tournament_edit_page_component__WEBPACK_IMPORTED_MODULE_36__.TournamentEditPageComponent, _components_content_block_content_block_component__WEBPACK_IMPORTED_MODULE_37__.ContentBlockComponent, _components_content_block_list_content_block_list_component__WEBPACK_IMPORTED_MODULE_38__.ContentBlockListComponent, _pages_content_blocks_page_content_blocks_page_component__WEBPACK_IMPORTED_MODULE_39__.ContentBlocksPageComponent, _components_content_block_editor_content_block_editor_component__WEBPACK_IMPORTED_MODULE_40__.ContentBlockEditorComponent],
    imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__.BrowserModule, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormsModule, _app_routing_module__WEBPACK_IMPORTED_MODULE_6__.AppRoutingModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_15__.HttpClientModule, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__.NgbModule, ngx_highlightjs__WEBPACK_IMPORTED_MODULE_4__.HighlightModule, _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_5__.FontAwesomeModule, _auth0_auth0_angular__WEBPACK_IMPORTED_MODULE_16__.AuthModule, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_21__.BrowserAnimationsModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_33__.MatFormFieldModule, _angular_material_card__WEBPACK_IMPORTED_MODULE_25__.MatCardModule, _angular_material_sort__WEBPACK_IMPORTED_MODULE_22__.MatSortModule, _angular_material_select__WEBPACK_IMPORTED_MODULE_23__.MatSelectModule, _angular_material_table__WEBPACK_IMPORTED_MODULE_24__.MatTableModule, _tinymce_tinymce_angular__WEBPACK_IMPORTED_MODULE_41__.EditorModule]
  });
})();

/***/ }),

/***/ 1255:
/*!*******************************************************************************!*\
  !*** ./src/app/components/content-block-list/content-block-list.component.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ContentBlockListComponent: () => (/* binding */ ContentBlockListComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 2481);
/* harmony import */ var _services_api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @services/api.service */ 3366);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 3683);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 4487);




const _c0 = a0 => ["/contentblocks", a0];
function ContentBlockListComponent_li_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li")(1, "a", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const key_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](2, _c0, key_r1));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](key_r1);
  }
}
class ContentBlockListComponent {
  constructor(api) {
    this.api = api;
    this.keys = [];
  }
  ngOnInit() {
    this.api.contentBlocks$().subscribe(blocks => {
      this.keys = [...new Set(blocks.map(x => x.ContentBlock))].sort((a, b) => a.localeCompare(b, 'en', {
        sensitivity: 'base'
      }));
    });
  }
  static {
    this.ɵfac = function ContentBlockListComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || ContentBlockListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_api_service__WEBPACK_IMPORTED_MODULE_1__.ApiService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: ContentBlockListComponent,
      selectors: [["app-content-block-list"]],
      standalone: false,
      decls: 5,
      vars: 1,
      consts: [[1, "container"], [4, "ngFor", "ngForOf"], [3, "routerLink"]],
      template: function ContentBlockListComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h2");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Content Blocks");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 0)(3, "ul");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, ContentBlockListComponent_li_4_Template, 3, 4, "li", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.keys);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgForOf, _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterLink],
      styles: [".container[_ngcontent-%COMP%] {\n    height: 600px;\n    overflow-x: hidden;\n    overflow-y: auto;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29tcG9uZW50cy9jb250ZW50LWJsb2NrLWxpc3QvY29udGVudC1ibG9jay1saXN0LmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxhQUFhO0lBQ2Isa0JBQWtCO0lBQ2xCLGdCQUFnQjtBQUNwQiIsInNvdXJjZXNDb250ZW50IjpbIi5jb250YWluZXIge1xuICAgIGhlaWdodDogNjAwcHg7XG4gICAgb3ZlcmZsb3cteDogaGlkZGVuO1xuICAgIG92ZXJmbG93LXk6IGF1dG87XG59Il0sInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ }),

/***/ 1257:
/*!*******************************************************************!*\
  !*** ./src/app/components/home-content/home-content.component.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HomeContentComponent: () => (/* binding */ HomeContentComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 2481);
/* harmony import */ var _services_api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../services/api.service */ 3366);
/* harmony import */ var _content_block_content_block_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../content-block/content-block.component */ 1913);



class HomeContentComponent {
  constructor(api) {
    this.api = api;
  }
  ngOnInit() {}
  static {
    this.ɵfac = function HomeContentComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || HomeContentComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_api_service__WEBPACK_IMPORTED_MODULE_1__.ApiService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: HomeContentComponent,
      selectors: [["app-home-content"]],
      standalone: false,
      decls: 4,
      vars: 0,
      consts: [[1, "next-steps", "my-5"], [1, "my-5", "text-center"], ["key", "homepage"]],
      template: function HomeContentComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "h2", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Welcome");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "app-content-block", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }
      },
      dependencies: [_content_block_content_block_component__WEBPACK_IMPORTED_MODULE_2__.ContentBlockComponent],
      styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ }),

/***/ 1383:
/*!****************************************************************!*\
  !*** ./src/app/pages/schedule-page/schedule-page.component.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SchedulePageComponent: () => (/* binding */ SchedulePageComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 2481);
/* harmony import */ var _components_schedule_list_schedule_list_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/schedule-list/schedule-list.component */ 2397);


class SchedulePageComponent {
  static {
    this.ɵfac = function SchedulePageComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || SchedulePageComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: SchedulePageComponent,
      selectors: [["app-schedule-page"]],
      standalone: false,
      decls: 1,
      vars: 0,
      template: function SchedulePageComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-schedule-list");
        }
      },
      dependencies: [_components_schedule_list_schedule_list_component__WEBPACK_IMPORTED_MODULE_1__.ScheduleListComponent],
      styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ }),

/***/ 1529:
/*!*****************************************************************************!*\
  !*** ./src/app/components/tournament-viewer/tournament-viewer.component.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TournamentViewerComponent: () => (/* binding */ TournamentViewerComponent)
/* harmony export */ });
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/material/sort */ 2047);
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/table */ 78);
/* harmony import */ var _services_permission_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @services/permission.service */ 154);
/* harmony import */ var _utils_export_to_csv__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/export-to-csv */ 8561);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2481);
/* harmony import */ var _services_api_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @services/api.service */ 3366);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 3683);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 4487);











const _c0 = () => ["./upload"];
const _c1 = () => ["./edit"];
const _c2 = a0 => ["/bowlers", a0];
function TournamentViewerComponent_a_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "a", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "Upload Results");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction0"](1, _c0));
  }
}
function TournamentViewerComponent_a_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "a", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "Edit Results");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction0"](1, _c1));
  }
}
function TournamentViewerComponent_th_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "th", 23);
  }
}
function TournamentViewerComponent_td_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "td", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const i_r1 = ctx.index;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](i_r1 + 1);
  }
}
function TournamentViewerComponent_th_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "th", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, " Name ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function TournamentViewerComponent_td_13_span_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "(i)");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function TournamentViewerComponent_td_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "td", 24)(1, "a", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](3, TournamentViewerComponent_td_13_span_3_Template, 2, 0, "span", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const element_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction1"](3, _c2, element_r2.BowlerId));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](element_r2.Bowler);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", element_r2.IgnoreForAverage);
  }
}
function TournamentViewerComponent_th_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "th", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, " Avg ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function TournamentViewerComponent_td_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "td", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const element_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](element_r3.Average);
  }
}
function TournamentViewerComponent_th_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "th", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "1");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function TournamentViewerComponent_td_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "td", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const element_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](element_r4.Game1);
  }
}
function TournamentViewerComponent_th_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "th", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "2");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function TournamentViewerComponent_td_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "td", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const element_r5 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](element_r5.Game2);
  }
}
function TournamentViewerComponent_th_24_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "th", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "3");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function TournamentViewerComponent_td_25_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "td", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const element_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](element_r6.Game3);
  }
}
function TournamentViewerComponent_th_27_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "th", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "4");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function TournamentViewerComponent_td_28_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "td", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const element_r7 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](element_r7.Game4);
  }
}
function TournamentViewerComponent_th_30_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "th", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "5");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function TournamentViewerComponent_td_31_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "td", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const element_r8 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](element_r8.Game5);
  }
}
function TournamentViewerComponent_th_33_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "th", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "6");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function TournamentViewerComponent_td_34_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "td", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const element_r9 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](element_r9.Game6);
  }
}
function TournamentViewerComponent_th_36_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "th", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "7");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function TournamentViewerComponent_td_37_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "td", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const element_r10 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](element_r10.Game7);
  }
}
function TournamentViewerComponent_th_39_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "th", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "8");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function TournamentViewerComponent_td_40_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "td", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const element_r11 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](element_r11.Game8);
  }
}
function TournamentViewerComponent_th_42_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "th", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, " Scratch ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function TournamentViewerComponent_td_43_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "td", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const element_r12 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", element_r12.scratch(), " ");
  }
}
function TournamentViewerComponent_th_45_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "th", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, " POA ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function TournamentViewerComponent_td_46_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "td", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const element_r13 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", element_r13.poa(), " ");
  }
}
function TournamentViewerComponent_tr_47_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "tr", 28);
  }
}
function TournamentViewerComponent_tr_48_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "tr", 29);
  }
}
class TournamentViewerComponent {
  constructor(permissions, api) {
    this.permissions = permissions;
    this.api = api;
    this.displayedColumns = [];
    this.dataSource = new _angular_material_table__WEBPACK_IMPORTED_MODULE_1__.MatTableDataSource([]);
    this.canEditTournament = false;
  }
  isTournament(division) {
    return "Tournament".localeCompare(division.toString(), undefined, {
      sensitivity: 'base'
    }) === 0;
  }
  ngOnInit() {
    //TODO: CHAD: can probably move to auth route guard somehow with the permissions???
    this.permissions.checkPermission(_services_permission_service__WEBPACK_IMPORTED_MODULE_2__.PERMISSION.EDIT_TOURNAMENT).subscribe(canEdit => {
      this.canEditTournament = canEdit;
    });
  }
  ngOnChanges(_changes) {
    const games = ['Game1', 'Game2', 'Game3', 'Game4', 'Game5', 'Game6', 'Game7', 'Game8'];
    const scratchColumns = ['Pos', 'Bowler', ...games, 'Scratch'];
    const poaColumns = ['Pos', 'Bowler', 'Average', ...games, 'Scratch', 'POA'];
    this.api.tournamentResults$(this.tournament).subscribe(results => {
      this.displayedColumns = this.isTournament(this.division) ? scratchColumns : poaColumns;
      this.dataSource.data = this.isTournament(this.division) ? results.sort((x, y) => y.scratch() - x.scratch()) : results.sort((x, y) => y.poa() - x.poa());
    });
  }
  ngAfterViewInit() {
    this.isTournament(this.division) ? this.sort.sort({
      id: 'Scratch',
      start: 'desc'
    }) : this.sort.sort({
      id: 'POA',
      start: 'desc'
    });
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property.toLocaleLowerCase()) {
        case 'scratch':
          return item.scratch();
        case 'poa':
          return item.poa();
        default:
          return item[property];
      }
    };
  }
  exportCsv() {
    const rows = this.dataSource.filteredData?.length ? this.dataSource.filteredData : this.dataSource.data;
    (0,_utils_export_to_csv__WEBPACK_IMPORTED_MODULE_3__.exportToCsv)('tournament-results.csv', this.displayedColumns, rows);
  }
  static {
    this.ɵfac = function TournamentViewerComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || TournamentViewerComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_services_permission_service__WEBPACK_IMPORTED_MODULE_2__.PermissionService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_services_api_service__WEBPACK_IMPORTED_MODULE_5__.ApiService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
      type: TournamentViewerComponent,
      selectors: [["app-tournament-viewer"]],
      viewQuery: function TournamentViewerComponent_Query(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵviewQuery"](_angular_material_sort__WEBPACK_IMPORTED_MODULE_0__.MatSort, 5);
        }
        if (rf & 2) {
          let _t;
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵloadQuery"]()) && (ctx.sort = _t.first);
        }
      },
      inputs: {
        division: "division",
        season: "season",
        tournament: "tournament"
      },
      standalone: false,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵNgOnChangesFeature"]],
      decls: 49,
      vars: 6,
      consts: [[1, "justify"], [3, "routerLink", 4, "ngIf"], [1, "btn", "btn-success", 3, "click"], ["mat-table", "", "matSort", "", 1, "mat-elevation-z8", 3, "dataSource"], ["matColumnDef", "Pos"], ["mat-header-cell", "", "mat-sort-header", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "Bowler"], ["matColumnDef", "Average"], ["mat-header-cell", "", "mat-sort-header", "", "start", "desc", "width", "3em", 4, "matHeaderCellDef"], ["matColumnDef", "Game1"], ["matColumnDef", "Game2"], ["matColumnDef", "Game3"], ["matColumnDef", "Game4"], ["matColumnDef", "Game5"], ["matColumnDef", "Game6"], ["matColumnDef", "Game7"], ["matColumnDef", "Game8"], ["matColumnDef", "Scratch"], ["matColumnDef", "POA"], ["mat-header-row", "", 4, "matHeaderRowDef", "matHeaderRowDefSticky"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], [3, "routerLink"], ["mat-header-cell", "", "mat-sort-header", ""], ["mat-cell", ""], ["class", "ignored-avg", "aria-label", "ignored", 4, "ngIf"], ["aria-label", "ignored", 1, "ignored-avg"], ["mat-header-cell", "", "mat-sort-header", "", "start", "desc", "width", "3em"], ["mat-header-row", ""], ["mat-row", ""]],
      template: function TournamentViewerComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, TournamentViewerComponent_a_1_Template, 2, 2, "a", 1)(2, TournamentViewerComponent_a_2_Template, 2, 2, "a", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "span");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4, "\u00A0");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "button", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function TournamentViewerComponent_Template_button_click_5_listener() {
            return ctx.exportCsv();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](6, "Export as CSV");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](7, "table", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](8, 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](9, TournamentViewerComponent_th_9_Template, 1, 0, "th", 5)(10, TournamentViewerComponent_td_10_Template, 2, 1, "td", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](11, 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](12, TournamentViewerComponent_th_12_Template, 2, 0, "th", 5)(13, TournamentViewerComponent_td_13_Template, 4, 5, "td", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](14, 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](15, TournamentViewerComponent_th_15_Template, 2, 0, "th", 9)(16, TournamentViewerComponent_td_16_Template, 2, 1, "td", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](17, 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](18, TournamentViewerComponent_th_18_Template, 2, 0, "th", 9)(19, TournamentViewerComponent_td_19_Template, 2, 1, "td", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](20, 11);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](21, TournamentViewerComponent_th_21_Template, 2, 0, "th", 9)(22, TournamentViewerComponent_td_22_Template, 2, 1, "td", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](23, 12);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](24, TournamentViewerComponent_th_24_Template, 2, 0, "th", 9)(25, TournamentViewerComponent_td_25_Template, 2, 1, "td", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](26, 13);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](27, TournamentViewerComponent_th_27_Template, 2, 0, "th", 9)(28, TournamentViewerComponent_td_28_Template, 2, 1, "td", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](29, 14);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](30, TournamentViewerComponent_th_30_Template, 2, 0, "th", 9)(31, TournamentViewerComponent_td_31_Template, 2, 1, "td", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](32, 15);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](33, TournamentViewerComponent_th_33_Template, 2, 0, "th", 9)(34, TournamentViewerComponent_td_34_Template, 2, 1, "td", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](35, 16);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](36, TournamentViewerComponent_th_36_Template, 2, 0, "th", 9)(37, TournamentViewerComponent_td_37_Template, 2, 1, "td", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](38, 17);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](39, TournamentViewerComponent_th_39_Template, 2, 0, "th", 9)(40, TournamentViewerComponent_td_40_Template, 2, 1, "td", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](41, 18);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](42, TournamentViewerComponent_th_42_Template, 2, 0, "th", 9)(43, TournamentViewerComponent_td_43_Template, 2, 1, "td", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](44, 19);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](45, TournamentViewerComponent_th_45_Template, 2, 0, "th", 9)(46, TournamentViewerComponent_td_46_Template, 2, 1, "td", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](47, TournamentViewerComponent_tr_47_Template, 1, 0, "tr", 20)(48, TournamentViewerComponent_tr_48_Template, 1, 0, "tr", 21);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.canEditTournament && !ctx.dataSource.data.length);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.canEditTournament && !!ctx.dataSource.data.length);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("dataSource", ctx.dataSource);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](40);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("matHeaderRowDef", ctx.displayedColumns)("matHeaderRowDefSticky", true);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("matRowDefColumns", ctx.displayedColumns);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterLink, _angular_material_sort__WEBPACK_IMPORTED_MODULE_0__.MatSort, _angular_material_sort__WEBPACK_IMPORTED_MODULE_0__.MatSortHeader, _angular_material_table__WEBPACK_IMPORTED_MODULE_1__.MatTable, _angular_material_table__WEBPACK_IMPORTED_MODULE_1__.MatHeaderCellDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_1__.MatHeaderRowDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_1__.MatColumnDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_1__.MatCellDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_1__.MatRowDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_1__.MatHeaderCell, _angular_material_table__WEBPACK_IMPORTED_MODULE_1__.MatCell, _angular_material_table__WEBPACK_IMPORTED_MODULE_1__.MatHeaderRow, _angular_material_table__WEBPACK_IMPORTED_MODULE_1__.MatRow],
      styles: ["table[_ngcontent-%COMP%] {\n    width: 100%;\n    margin-bottom: 1em;\n}\n\nth[_ngcontent-%COMP%], td[_ngcontent-%COMP%] {\n    text-align: right;\n}\n\n.mat-column-Bowler[_ngcontent-%COMP%] {\n    text-align: left;\n}\n\n.mdc-data-table__row[_ngcontent-%COMP%] {\n    height: 40px;\n}\n\n.ignored-avg[_ngcontent-%COMP%] {\n    color: #c0392b;\n    font-size: 0.8em;\n    margin-left: 6px;\n    font-weight: 600;\n}\n\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29tcG9uZW50cy90b3VybmFtZW50LXZpZXdlci90b3VybmFtZW50LXZpZXdlci5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksV0FBVztJQUNYLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLGlCQUFpQjtBQUNyQjs7QUFFQTtJQUNJLGdCQUFnQjtBQUNwQjs7QUFFQTtJQUNJLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSxjQUFjO0lBQ2QsZ0JBQWdCO0lBQ2hCLGdCQUFnQjtJQUNoQixnQkFBZ0I7QUFDcEIiLCJzb3VyY2VzQ29udGVudCI6WyJ0YWJsZSB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgbWFyZ2luLWJvdHRvbTogMWVtO1xufVxuXG50aCwgdGQge1xuICAgIHRleHQtYWxpZ246IHJpZ2h0O1xufVxuXG4ubWF0LWNvbHVtbi1Cb3dsZXIge1xuICAgIHRleHQtYWxpZ246IGxlZnQ7XG59XG5cbi5tZGMtZGF0YS10YWJsZV9fcm93IHtcbiAgICBoZWlnaHQ6IDQwcHg7XG59XG5cbi5pZ25vcmVkLWF2ZyB7XG4gICAgY29sb3I6ICNjMDM5MmI7XG4gICAgZm9udC1zaXplOiAwLjhlbTtcbiAgICBtYXJnaW4tbGVmdDogNnB4O1xuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
    });
  }
}

/***/ }),

/***/ 1727:
/*!***********************************************************************!*\
  !*** ./src/app/components/bowler-results/bowler-results.component.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BowlerResultsComponent: () => (/* binding */ BowlerResultsComponent)
/* harmony export */ });
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/material/sort */ 2047);
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/table */ 78);
/* harmony import */ var _models_BowlerResultsRecord__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @models/BowlerResultsRecord */ 4747);
/* harmony import */ var _utils_export_to_csv__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/export-to-csv */ 8561);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2481);
/* harmony import */ var _auth0_auth0_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @auth0/auth0-angular */ 7989);
/* harmony import */ var _services_api_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @services/api.service */ 3366);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 3683);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ 4487);











const _c0 = (a0, a1, a2) => ["/results", a0, a1, a2];
function BowlerResultsComponent_th_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "th", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "Location");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function BowlerResultsComponent_td_6_span_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "(i)");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function BowlerResultsComponent_td_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "td", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, BowlerResultsComponent_td_6_span_2_Template, 2, 0, "span", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const element_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", element_r1.TournamentLocation, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", element_r1.IgnoreForAverage);
  }
}
function BowlerResultsComponent_th_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "th", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, " Date ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function BowlerResultsComponent_td_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "td", 26)(1, "a", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](3, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const element_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction3"](5, _c0, element_r2.Division, element_r2.SeasonCode, element_r2.TournamentId));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind2"](3, 2, element_r2.date(), "MMM dd, yyyy"), " ");
  }
}
function BowlerResultsComponent_th_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "th", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, " Division ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function BowlerResultsComponent_td_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "td", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const element_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](element_r3.Division);
  }
}
function BowlerResultsComponent_th_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "th", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, " Number ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function BowlerResultsComponent_td_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "td", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const element_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](element_r4.TournamentNumber);
  }
}
function BowlerResultsComponent_th_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "th", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "1");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function BowlerResultsComponent_td_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "td", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const element_r5 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](element_r5.Game1);
  }
}
function BowlerResultsComponent_th_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "th", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "2");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function BowlerResultsComponent_td_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "td", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const element_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](element_r6.Game2);
  }
}
function BowlerResultsComponent_th_23_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "th", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "3");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function BowlerResultsComponent_td_24_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "td", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const element_r7 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](element_r7.Game3);
  }
}
function BowlerResultsComponent_th_26_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "th", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "4");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function BowlerResultsComponent_td_27_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "td", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const element_r8 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](element_r8.Game4);
  }
}
function BowlerResultsComponent_th_29_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "th", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "5");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function BowlerResultsComponent_td_30_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "td", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const element_r9 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](element_r9.Game5);
  }
}
function BowlerResultsComponent_th_32_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "th", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "6");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function BowlerResultsComponent_td_33_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "td", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const element_r10 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](element_r10.Game6);
  }
}
function BowlerResultsComponent_th_35_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "th", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "7");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function BowlerResultsComponent_td_36_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "td", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const element_r11 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](element_r11.Game7);
  }
}
function BowlerResultsComponent_th_38_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "th", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "8");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function BowlerResultsComponent_td_39_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "td", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const element_r12 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](element_r12.Game8);
  }
}
function BowlerResultsComponent_th_41_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "th", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, " Scratch ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function BowlerResultsComponent_td_42_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "td", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const element_r13 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", element_r13.scratch(), " ");
  }
}
function BowlerResultsComponent_th_44_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "th", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "Avg");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function BowlerResultsComponent_td_45_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "td", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const element_r14 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](!!element_r14.BowlerAverage ? element_r14.BowlerAverage : "");
  }
}
function BowlerResultsComponent_th_47_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "th", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, " POA ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function BowlerResultsComponent_td_48_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "td", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const element_r15 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", element_r15.Division === "Tournament" ? "" : element_r15.poa(), " ");
  }
}
function BowlerResultsComponent_tr_49_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "tr", 33);
  }
}
function BowlerResultsComponent_tr_50_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "tr", 34);
  }
  if (rf & 2) {
    const row_r16 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵclassProp"]("non-average", !row_r16.countsForAverage);
  }
}
class BowlerResultsComponent {
  constructor(auth, api) {
    this.auth = auth;
    this.api = api;
    this.displayedColumns = ['TournamentLocation', 'Date', 'Division', 'TournamentNumber', 'Game1', 'Game2', 'Game3', 'Game4', 'Game5', 'Game6', 'Game7', 'Game8', 'Scratch', 'BowlerAverage', 'POA'];
    this.dataSource = new _angular_material_table__WEBPACK_IMPORTED_MODULE_1__.MatTableDataSource([]);
  }
  ngOnChanges(_changes) {
    this.api.bowlerResults$(this.bowler).subscribe(results => {
      const sorted = [...results].sort((a, b) => b.date().valueOf() - a.date().valueOf());
      const seasonOrder = Array.from(new Set(sorted.map(r => r.SeasonCode))).sort((a, b) => b - a);
      const allowedSeasons = new Set(seasonOrder.slice(0, 5));
      // Determine which tournaments contribute to the masters average (latest 10 eligible tournaments)
      const eligible = sorted.filter(r => allowedSeasons.has(r.SeasonCode) && !r.IgnoreForAverage);
      const includedTournamentIds = new Set(eligible.slice(0, 10).map(r => r.TournamentId));
      this.dataSource.data = sorted.map(r => {
        const countsForAverage = includedTournamentIds.has(r.TournamentId) && allowedSeasons.has(r.SeasonCode) && !r.IgnoreForAverage;
        return Object.assign(new _models_BowlerResultsRecord__WEBPACK_IMPORTED_MODULE_2__.BowlerResultsRecord(), r, {
          countsForAverage
        });
      });
    });
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property.toLocaleLowerCase()) {
        case 'date':
          return item.date();
        case 'scratch':
          return item.scratch();
        case 'poa':
          return item.poa();
        default:
          return item[property];
      }
    };
  }
  exportCsv() {
    const rows = this.dataSource.filteredData?.length ? this.dataSource.filteredData : this.dataSource.data;
    (0,_utils_export_to_csv__WEBPACK_IMPORTED_MODULE_3__.exportToCsv)('bowler-results.csv', this.displayedColumns, rows);
  }
  static {
    this.ɵfac = function BowlerResultsComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || BowlerResultsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_auth0_auth0_angular__WEBPACK_IMPORTED_MODULE_5__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_services_api_service__WEBPACK_IMPORTED_MODULE_6__.ApiService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
      type: BowlerResultsComponent,
      selectors: [["app-bowler-results"]],
      viewQuery: function BowlerResultsComponent_Query(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵviewQuery"](_angular_material_sort__WEBPACK_IMPORTED_MODULE_0__.MatSort, 5);
        }
        if (rf & 2) {
          let _t;
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵloadQuery"]()) && (ctx.sort = _t.first);
        }
      },
      inputs: {
        bowler: "bowler"
      },
      standalone: false,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵNgOnChangesFeature"]],
      decls: 51,
      vars: 4,
      consts: [["id", "exports"], ["id", "csv", "mat-button", "", 3, "click"], ["mat-table", "", "matSort", "", 1, "mat-elevation-z8", 3, "dataSource"], ["matColumnDef", "TournamentLocation"], ["mat-header-cell", "", "mat-sort-header", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "Date"], ["mat-header-cell", "", "mat-sort-header", "", "start", "desc", 4, "matHeaderCellDef"], ["matColumnDef", "Division"], ["matColumnDef", "TournamentNumber"], ["mat-header-cell", "", "mat-sort-header", "", "width", "3em", 4, "matHeaderCellDef"], ["matColumnDef", "Game1"], ["mat-header-cell", "", "mat-sort-header", "", "start", "desc", "width", "3em", 4, "matHeaderCellDef"], ["matColumnDef", "Game2"], ["matColumnDef", "Game3"], ["matColumnDef", "Game4"], ["matColumnDef", "Game5"], ["matColumnDef", "Game6"], ["matColumnDef", "Game7"], ["matColumnDef", "Game8"], ["matColumnDef", "Scratch"], ["matColumnDef", "BowlerAverage"], ["matColumnDef", "POA"], ["mat-header-row", "", 4, "matHeaderRowDef", "matHeaderRowDefSticky"], ["mat-row", "", 3, "non-average", 4, "matRowDef", "matRowDefColumns"], ["mat-header-cell", "", "mat-sort-header", ""], ["mat-cell", ""], ["class", "ignored-avg", "aria-label", "ignored", 4, "ngIf"], ["aria-label", "ignored", 1, "ignored-avg"], ["mat-header-cell", "", "mat-sort-header", "", "start", "desc"], [3, "routerLink"], ["mat-header-cell", "", "mat-sort-header", "", "width", "3em"], ["mat-header-cell", "", "mat-sort-header", "", "start", "desc", "width", "3em"], ["mat-header-row", ""], ["mat-row", ""]],
      template: function BowlerResultsComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 0)(1, "button", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function BowlerResultsComponent_Template_button_click_1_listener() {
            return ctx.exportCsv();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "Export as CSV");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "table", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](4, 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](5, BowlerResultsComponent_th_5_Template, 2, 0, "th", 4)(6, BowlerResultsComponent_td_6_Template, 3, 2, "td", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](7, 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](8, BowlerResultsComponent_th_8_Template, 2, 0, "th", 7)(9, BowlerResultsComponent_td_9_Template, 4, 9, "td", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](10, 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](11, BowlerResultsComponent_th_11_Template, 2, 0, "th", 4)(12, BowlerResultsComponent_td_12_Template, 2, 1, "td", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](13, 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](14, BowlerResultsComponent_th_14_Template, 2, 0, "th", 10)(15, BowlerResultsComponent_td_15_Template, 2, 1, "td", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](16, 11);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](17, BowlerResultsComponent_th_17_Template, 2, 0, "th", 12)(18, BowlerResultsComponent_td_18_Template, 2, 1, "td", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](19, 13);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](20, BowlerResultsComponent_th_20_Template, 2, 0, "th", 12)(21, BowlerResultsComponent_td_21_Template, 2, 1, "td", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](22, 14);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](23, BowlerResultsComponent_th_23_Template, 2, 0, "th", 12)(24, BowlerResultsComponent_td_24_Template, 2, 1, "td", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](25, 15);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](26, BowlerResultsComponent_th_26_Template, 2, 0, "th", 12)(27, BowlerResultsComponent_td_27_Template, 2, 1, "td", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](28, 16);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](29, BowlerResultsComponent_th_29_Template, 2, 0, "th", 12)(30, BowlerResultsComponent_td_30_Template, 2, 1, "td", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](31, 17);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](32, BowlerResultsComponent_th_32_Template, 2, 0, "th", 12)(33, BowlerResultsComponent_td_33_Template, 2, 1, "td", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](34, 18);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](35, BowlerResultsComponent_th_35_Template, 2, 0, "th", 12)(36, BowlerResultsComponent_td_36_Template, 2, 1, "td", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](37, 19);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](38, BowlerResultsComponent_th_38_Template, 2, 0, "th", 12)(39, BowlerResultsComponent_td_39_Template, 2, 1, "td", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](40, 20);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](41, BowlerResultsComponent_th_41_Template, 2, 0, "th", 12)(42, BowlerResultsComponent_td_42_Template, 2, 1, "td", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](43, 21);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](44, BowlerResultsComponent_th_44_Template, 2, 0, "th", 12)(45, BowlerResultsComponent_td_45_Template, 2, 1, "td", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](46, 22);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](47, BowlerResultsComponent_th_47_Template, 2, 0, "th", 12)(48, BowlerResultsComponent_td_48_Template, 2, 1, "td", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](49, BowlerResultsComponent_tr_49_Template, 1, 0, "tr", 23)(50, BowlerResultsComponent_tr_50_Template, 1, 2, "tr", 24);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("dataSource", ctx.dataSource);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](46);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("matHeaderRowDef", ctx.displayedColumns)("matHeaderRowDefSticky", true);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("matRowDefColumns", ctx.displayedColumns);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, _angular_router__WEBPACK_IMPORTED_MODULE_8__.RouterLink, _angular_material_sort__WEBPACK_IMPORTED_MODULE_0__.MatSort, _angular_material_sort__WEBPACK_IMPORTED_MODULE_0__.MatSortHeader, _angular_material_table__WEBPACK_IMPORTED_MODULE_1__.MatTable, _angular_material_table__WEBPACK_IMPORTED_MODULE_1__.MatHeaderCellDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_1__.MatHeaderRowDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_1__.MatColumnDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_1__.MatCellDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_1__.MatRowDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_1__.MatHeaderCell, _angular_material_table__WEBPACK_IMPORTED_MODULE_1__.MatCell, _angular_material_table__WEBPACK_IMPORTED_MODULE_1__.MatHeaderRow, _angular_material_table__WEBPACK_IMPORTED_MODULE_1__.MatRow, _angular_common__WEBPACK_IMPORTED_MODULE_7__.DatePipe],
      styles: ["a[_ngcontent-%COMP%] {\n    white-space: nowrap;\n}\n\n#exports[_ngcontent-%COMP%] {\n    width: 100%;\n\n    #csv {\n        float: right;\n    }\n}\n\n.non-average[_ngcontent-%COMP%] {\n    background-color: #eee !important;\n}\n\n.ignored-avg[_ngcontent-%COMP%] {\n    color: #c0392b;\n    font-size: 0.8em;\n    margin-left: 6px;\n    font-weight: 600;\n}\n\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29tcG9uZW50cy9ib3dsZXItcmVzdWx0cy9ib3dsZXItcmVzdWx0cy5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0ksV0FBVzs7SUFFWDtRQUNJLFlBQVk7SUFDaEI7QUFDSjs7QUFFQTtJQUNJLGlDQUFpQztBQUNyQzs7QUFFQTtJQUNJLGNBQWM7SUFDZCxnQkFBZ0I7SUFDaEIsZ0JBQWdCO0lBQ2hCLGdCQUFnQjtBQUNwQiIsInNvdXJjZXNDb250ZW50IjpbImEge1xuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG59XG5cbiNleHBvcnRzIHtcbiAgICB3aWR0aDogMTAwJTtcblxuICAgICNjc3Yge1xuICAgICAgICBmbG9hdDogcmlnaHQ7XG4gICAgfVxufVxuXG4ubm9uLWF2ZXJhZ2Uge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNlZWUgIWltcG9ydGFudDtcbn1cblxuLmlnbm9yZWQtYXZnIHtcbiAgICBjb2xvcjogI2MwMzkyYjtcbiAgICBmb250LXNpemU6IDAuOGVtO1xuICAgIG1hcmdpbi1sZWZ0OiA2cHg7XG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
    });
  }
}

/***/ }),

/***/ 1913:
/*!*********************************************************************!*\
  !*** ./src/app/components/content-block/content-block.component.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ContentBlockComponent: () => (/* binding */ ContentBlockComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 2481);
/* harmony import */ var _services_api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @services/api.service */ 3366);


class ContentBlockComponent {
  constructor(api) {
    this.api = api;
  }
  ngOnInit() {
    this.api.contentBlocks$(this.key).subscribe(blocks => {
      this.content = blocks.slice(-1)[0].ContentHTML;
    });
  }
  static {
    this.ɵfac = function ContentBlockComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || ContentBlockComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_api_service__WEBPACK_IMPORTED_MODULE_1__.ApiService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: ContentBlockComponent,
      selectors: [["app-content-block"]],
      inputs: {
        key: "key"
      },
      standalone: false,
      decls: 1,
      vars: 1,
      consts: [[3, "innerHTML"]],
      template: function ContentBlockComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "div", 0);
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("innerHTML", ctx.content, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeHtml"]);
        }
      },
      styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ }),

/***/ 1977:
/*!*********************************************************!*\
  !*** ./src/app/components/nav-bar/nav-bar.component.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NavBarComponent: () => (/* binding */ NavBarComponent)
/* harmony export */ });
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ 9634);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 4205);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2481);
/* harmony import */ var _auth0_auth0_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @auth0/auth0-angular */ 7989);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 3683);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 4487);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 8418);
/* harmony import */ var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @fortawesome/angular-fontawesome */ 7518);








function NavBarComponent_li_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "li", 8)(1, "button", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function NavBarComponent_li_24_Template_button_click_1_listener() {
      _angular_common__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_common__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.loginWithRedirect());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, " Log in ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
}
function NavBarComponent_li_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "li", 20)(1, "a", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "img", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "div", 23)(4, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "a", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](7, "fa-icon", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8, " Profile ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "button", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function NavBarComponent_li_26_Template_button_click_9_listener() {
      _angular_common__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r3);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_common__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.logout());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](10, "fa-icon", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](11, " Log out ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const user_r4 = ctx.ngIf;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("src", user_r4.picture, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", user_r4.name, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("icon", ctx_r1.faUser);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("icon", ctx_r1.faPowerOff);
  }
}
function NavBarComponent_ul_28_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "ul", 28)(1, "a", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "Login");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
}
function NavBarComponent_ul_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "ul", 30)(1, "li", 8)(2, "span", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](3, "img", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "h6", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](7, "fa-icon", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "a", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9, "Profile");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](11, "fa-icon", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "button", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function NavBarComponent_ul_30_Template_button_click_12_listener() {
      _angular_common__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r5);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_common__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.logout());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](13, " Log out ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const user_r6 = ctx.ngIf;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("src", user_r6.picture, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](user_r6.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("icon", ctx_r1.faUser);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("icon", ctx_r1.faPowerOff);
  }
}
class NavBarComponent {
  constructor(auth, doc) {
    this.auth = auth;
    this.doc = doc;
    this.isCollapsed = true;
    this.faUser = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_0__.faUser;
    this.faPowerOff = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_0__.faPowerOff;
  }
  ngOnInit() {}
  loginWithRedirect() {
    this.auth.loginWithRedirect();
  }
  logout() {
    this.auth.logout({
      logoutParams: {
        returnTo: this.doc.location.origin
      }
    });
  }
  static {
    this.ɵfac = function NavBarComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || NavBarComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_auth0_auth0_angular__WEBPACK_IMPORTED_MODULE_3__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_1__.DOCUMENT));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
      type: NavBarComponent,
      selectors: [["app-nav-bar"]],
      standalone: false,
      decls: 32,
      vars: 14,
      consts: [[1, "nav-container"], [1, "navbar", "navbar-expand-md", "navbar-light", "bg-light"], [1, "container"], [1, "navbar-brand", "logo"], ["type", "button", "data-toggle", "collapse", "data-target", "#navbarNav", "aria-controls", "navbarNav", "aria-label", "Toggle navigation", 1, "navbar-toggler", 3, "click"], [1, "navbar-toggler-icon"], ["id", "navbarNav", 1, "collapse", "navbar-collapse", 3, "ngbCollapse"], [1, "navbar-nav", "mr-auto"], [1, "nav-item"], ["routerLink", "/", 1, "nav-link"], ["routerLink", "/schedule", 1, "nav-link"], ["routerLink", "/results/tournament", 1, "nav-link"], ["routerLink", "/results/teaching", 1, "nav-link"], ["routerLink", "/results/senior", 1, "nav-link"], [1, "navbar-nav", "d-none", "d-md-block"], ["class", "nav-item", 4, "ngIf"], ["class", "nav-item dropdown", "ngbDropdown", "", 4, "ngIf"], ["class", "navbar-nav d-md-none", 4, "ngIf"], ["class", "navbar-nav d-md-none justify-content-between", "style", "min-height: 170px;", 4, "ngIf"], ["id", "qsLoginBtn", 1, "btn", "btn-primary", "btn-margin", 3, "click"], ["ngbDropdown", "", 1, "nav-item", "dropdown"], ["ngbDropdownToggle", "", "id", "profileDropDown", "data-toggle", "dropdown", 1, "nav-link", "dropdown-toggle"], ["alt", "Profile picture", 1, "nav-user-profile", "rounded-circle", 2, "width", "75px", 3, "src"], ["ngbDropdownMenu", "", 1, "dropdown-menu", "dropdown-menu-left"], [1, "dropdown-header"], ["routerLink", "/profile", 1, "dropdown-item", "dropdown-profile"], [1, "mr-3", 3, "icon"], [1, "btn", "btn-link", "dropdown-item", 3, "click"], [1, "navbar-nav", "d-md-none"], ["href", "https://manitobamastersfunc.azurewebsites.net/.auth/login/Auth0/callback"], [1, "navbar-nav", "d-md-none", "justify-content-between", 2, "min-height", "170px"], [1, "user-info"], ["alt", "Profile picture", 1, "nav-user-profile", "d-inline-block", "rounded-circle", "mr-3", 2, "width", "75px", 3, "src"], [1, "d-inline-block"], ["routerLink", "/profile"], [1, "btn", "btn-link", "p-0", 3, "click"]],
      template: function NavBarComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0)(1, "nav", 1)(2, "div", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](3, "div", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "button", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function NavBarComponent_Template_button_click_4_listener() {
            return ctx.isCollapsed = !ctx.isCollapsed;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](5, "span", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "div", 6)(7, "ul", 7)(8, "li", 8)(9, "a", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10, "Home");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "li", 8)(12, "a", 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](13, "Schedule");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "li", 8)(15, "a", 11);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](16, "Tournament");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](17, "li", 8)(18, "a", 12);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](19, "Teaching");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](20, "li", 8)(21, "a", 13);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](22, "Senior");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](23, "ul", 14);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](24, NavBarComponent_li_24_Template, 3, 0, "li", 15);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](25, "async");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](26, NavBarComponent_li_26_Template, 12, 4, "li", 16);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](27, "async");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](28, NavBarComponent_ul_28_Template, 3, 0, "ul", 17);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](29, "async");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](30, NavBarComponent_ul_30_Template, 14, 4, "ul", 18);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](31, "async");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵattribute"]("aria-expanded", !ctx.isCollapsed);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngbCollapse", ctx.isCollapsed);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](18);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](25, 6, ctx.auth.isAuthenticated$) === false);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](27, 8, ctx.auth.user$));
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](29, 10, ctx.auth.isAuthenticated$) === false);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](31, 12, ctx.auth.user$));
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterLink, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__.NgbCollapse, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__.NgbDropdown, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__.NgbDropdownToggle, _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_6__.NgbDropdownMenu, _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_7__.FaIconComponent, _angular_common__WEBPACK_IMPORTED_MODULE_4__.AsyncPipe],
      styles: [".logo[_ngcontent-%COMP%] {\n    background-image: url('MBAM.svg');\n    background-size: contain;\n    height: 64px;\n    width: 64px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29tcG9uZW50cy9uYXYtYmFyL25hdi1iYXIuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLGlDQUE2QztJQUM3Qyx3QkFBd0I7SUFDeEIsWUFBWTtJQUNaLFdBQVc7QUFDZiIsInNvdXJjZXNDb250ZW50IjpbIi5sb2dvIHtcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJ35zcmMvYXNzZXRzL01CQU0uc3ZnJyk7XG4gICAgYmFja2dyb3VuZC1zaXplOiBjb250YWluO1xuICAgIGhlaWdodDogNjRweDtcbiAgICB3aWR0aDogNjRweDtcbn0iXSwic291cmNlUm9vdCI6IiJ9 */"]
    });
  }
}

/***/ }),

/***/ 2245:
/*!**********************************************!*\
  !*** ./src/environments/tinymce.secret.json ***!
  \**********************************************/
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"apiKey":"wvwplngl9odkypb53lmv0ycnuc6x9q0hj5xu9szpxylr22km"}');

/***/ }),

/***/ 2349:
/*!***********************************************************************************!*\
  !*** ./src/app/components/content-block-editor/content-block-editor.component.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ContentBlockEditorComponent: () => (/* binding */ ContentBlockEditorComponent)
/* harmony export */ });
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../environments/environment */ 5312);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2481);
/* harmony import */ var _services_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @services/api.service */ 3366);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _tinymce_tinymce_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @tinymce/tinymce-angular */ 5783);





const _c0 = () => ({
  base_url: "/assets/tinymce",
  plugins: "table paste lists link code",
  menubar: "file edit view insert format table tools",
  toolbar: "undo redo | styles | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | table | link | paste | code",
  paste_data_images: false
});
class ContentBlockEditorComponent {
  constructor(api) {
    this.api = api;
    this.contentHtml = '';
    this.editorApiKey = _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.tinymceApiKey;
  }
  ngOnChanges(changes) {
    this.loadContent();
  }
  ngAfterViewInit() {
    this.loadContent();
  }
  saveContent() {
    if (!this.key) return;
    this.api.saveContentBlock(this.key, this.contentHtml);
  }
  loadContent() {
    if (!this.key) return;
    this.api.contentBlocks$(this.key).subscribe(blocks => {
      this.contentHtml = blocks.slice(-1)?.[0]?.ContentHTML || '';
    });
  }
  static {
    this.ɵfac = function ContentBlockEditorComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || ContentBlockEditorComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_api_service__WEBPACK_IMPORTED_MODULE_2__.ApiService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
      type: ContentBlockEditorComponent,
      selectors: [["app-content-block-editor"]],
      inputs: {
        key: "key"
      },
      standalone: false,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵNgOnChangesFeature"]],
      decls: 5,
      vars: 4,
      consts: [[1, "editor-container"], [3, "ngModelChange", "apiKey", "init", "ngModel"], [1, "actions"], [1, "btn", "btn-primary", 3, "click"]],
      template: function ContentBlockEditorComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "editor", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("ngModelChange", function ContentBlockEditorComponent_Template_editor_ngModelChange_1_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx.contentHtml, $event) || (ctx.contentHtml = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 2)(3, "button", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ContentBlockEditorComponent_Template_button_click_3_listener() {
            return ctx.saveContent();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "Save");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("apiKey", ctx.editorApiKey)("init", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](3, _c0));
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("ngModel", ctx.contentHtml);
        }
      },
      dependencies: [_angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgModel, _tinymce_tinymce_angular__WEBPACK_IMPORTED_MODULE_4__.EditorComponent],
      styles: ["#editorContainer[_ngcontent-%COMP%] {\n    width: 100%;\n    min-height: 600px;\n}\n\n.editor-container[_ngcontent-%COMP%] {\n    width: 100%;\n    min-height: 600px;\n}\n\n.actions[_ngcontent-%COMP%] {\n    margin-top: 12px;\n    text-align: right;\n}\n\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29tcG9uZW50cy9jb250ZW50LWJsb2NrLWVkaXRvci9jb250ZW50LWJsb2NrLWVkaXRvci5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksV0FBVztJQUNYLGlCQUFpQjtBQUNyQjs7QUFFQTtJQUNJLFdBQVc7SUFDWCxpQkFBaUI7QUFDckI7O0FBRUE7SUFDSSxnQkFBZ0I7SUFDaEIsaUJBQWlCO0FBQ3JCIiwic291cmNlc0NvbnRlbnQiOlsiI2VkaXRvckNvbnRhaW5lciB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgbWluLWhlaWdodDogNjAwcHg7XG59XG5cbi5lZGl0b3ItY29udGFpbmVyIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBtaW4taGVpZ2h0OiA2MDBweDtcbn1cblxuLmFjdGlvbnMge1xuICAgIG1hcmdpbi10b3A6IDEycHg7XG4gICAgdGV4dC1hbGlnbjogcmlnaHQ7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
    });
  }
}

/***/ }),

/***/ 2397:
/*!*********************************************************************!*\
  !*** ./src/app/components/schedule-list/schedule-list.component.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ScheduleListComponent: () => (/* binding */ ScheduleListComponent)
/* harmony export */ });
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/material/sort */ 2047);
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/table */ 78);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2481);
/* harmony import */ var _auth0_auth0_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @auth0/auth0-angular */ 7989);
/* harmony import */ var _services_api_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @services/api.service */ 3366);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 4487);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 3683);









const _c0 = (a0, a1, a2) => ["/results", a0, a1, a2];
function ScheduleListComponent_th_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "th", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Location");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function ScheduleListComponent_td_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "td", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const element_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](element_r1.TournamentLocation);
  }
}
function ScheduleListComponent_th_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "th", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " Date ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function ScheduleListComponent_td_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "td", 11)(1, "a", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](3, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const element_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction3"](5, _c0, element_r2.Division, element_r2.SeasonCode, element_r2.Id));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind2"](3, 2, element_r2.date(), "MMM dd, yyyy h:mm"), " ");
  }
}
function ScheduleListComponent_th_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "th", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Division");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function ScheduleListComponent_td_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "td", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const element_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](element_r3.Division);
  }
}
function ScheduleListComponent_th_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "th", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "#");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function ScheduleListComponent_td_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "td", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const element_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](element_r4.TournamentNumber);
  }
}
function ScheduleListComponent_tr_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "tr", 14);
  }
}
function ScheduleListComponent_tr_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "tr", 15);
  }
  if (rf & 2) {
    const row_r5 = ctx.$implicit;
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("oldSeason", !ctx_r5.isCurrentSeason(row_r5))("futureTournament", ctx_r5.isFutureTournament(row_r5));
  }
}
class ScheduleListComponent {
  constructor(auth, api) {
    this.auth = auth;
    this.api = api;
    this.displayedColumns = ["TournamentDetails", "Division", "TournamentNumber", "TournamentLocation"];
    this.dataSource = new _angular_material_table__WEBPACK_IMPORTED_MODULE_1__.MatTableDataSource([]);
    this.latestSeason = '';
    this.isCurrentSeason = row => row.SeasonCode === this.latestSeason;
    this.isFutureTournament = row => row.SeasonCode === this.latestSeason && row.date().valueOf() > Date.now();
    this.api.tournaments$().subscribe(results => {
      this.dataSource.data = results.filter(x => ['Teaching', 'Tournament', 'Senior'].includes(x.Division)).sort((a, b) => b.date().valueOf() - a.date().valueOf());
      this.latestSeason = results.map(x => x.SeasonCode).sort().reverse()?.[0] || '';
    });
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property.toLocaleLowerCase()) {
        default:
          return item[property];
      }
    };
  }
  static {
    this.ɵfac = function ScheduleListComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || ScheduleListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_auth0_auth0_angular__WEBPACK_IMPORTED_MODULE_3__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_services_api_service__WEBPACK_IMPORTED_MODULE_4__.ApiService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
      type: ScheduleListComponent,
      selectors: [["app-schedule-list"]],
      viewQuery: function ScheduleListComponent_Query(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_angular_material_sort__WEBPACK_IMPORTED_MODULE_0__.MatSort, 5);
        }
        if (rf & 2) {
          let _t;
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.sort = _t.first);
        }
      },
      standalone: false,
      decls: 15,
      vars: 4,
      consts: [["mat-table", "", "matSort", "", 1, "mat-elevation-z8", 3, "dataSource"], ["matColumnDef", "TournamentLocation"], ["mat-header-cell", "", "mat-sort-header", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "TournamentDetails"], ["mat-header-cell", "", "mat-sort-header", "", "start", "desc", 4, "matHeaderCellDef"], ["matColumnDef", "Division"], ["matColumnDef", "TournamentNumber"], ["mat-header-row", "", 4, "matHeaderRowDef", "matHeaderRowDefSticky"], ["mat-row", "", 3, "oldSeason", "futureTournament", 4, "matRowDef", "matRowDefColumns"], ["mat-header-cell", "", "mat-sort-header", ""], ["mat-cell", ""], ["mat-header-cell", "", "mat-sort-header", "", "start", "desc"], [3, "routerLink"], ["mat-header-row", ""], ["mat-row", ""]],
      template: function ScheduleListComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "table", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](1, 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, ScheduleListComponent_th_2_Template, 2, 0, "th", 2)(3, ScheduleListComponent_td_3_Template, 2, 1, "td", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](4, 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](5, ScheduleListComponent_th_5_Template, 2, 0, "th", 5)(6, ScheduleListComponent_td_6_Template, 4, 9, "td", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](7, 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](8, ScheduleListComponent_th_8_Template, 2, 0, "th", 2)(9, ScheduleListComponent_td_9_Template, 2, 1, "td", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](10, 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](11, ScheduleListComponent_th_11_Template, 2, 0, "th", 2)(12, ScheduleListComponent_td_12_Template, 2, 1, "td", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](13, ScheduleListComponent_tr_13_Template, 1, 0, "tr", 8)(14, ScheduleListComponent_tr_14_Template, 1, 4, "tr", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("dataSource", ctx.dataSource);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](13);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("matHeaderRowDef", ctx.displayedColumns)("matHeaderRowDefSticky", true);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("matRowDefColumns", ctx.displayedColumns);
        }
      },
      dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterLink, _angular_material_sort__WEBPACK_IMPORTED_MODULE_0__.MatSort, _angular_material_sort__WEBPACK_IMPORTED_MODULE_0__.MatSortHeader, _angular_material_table__WEBPACK_IMPORTED_MODULE_1__.MatTable, _angular_material_table__WEBPACK_IMPORTED_MODULE_1__.MatHeaderCellDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_1__.MatHeaderRowDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_1__.MatColumnDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_1__.MatCellDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_1__.MatRowDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_1__.MatHeaderCell, _angular_material_table__WEBPACK_IMPORTED_MODULE_1__.MatCell, _angular_material_table__WEBPACK_IMPORTED_MODULE_1__.MatHeaderRow, _angular_material_table__WEBPACK_IMPORTED_MODULE_1__.MatRow, _angular_common__WEBPACK_IMPORTED_MODULE_6__.DatePipe],
      styles: [".oldSeason[_ngcontent-%COMP%] { \n    background-color: rgb(233, 233, 233) !important;\n}\n.futureTournament[_ngcontent-%COMP%] { \n    background-color: rgb(255, 255, 191) !important;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29tcG9uZW50cy9zY2hlZHVsZS1saXN0L3NjaGVkdWxlLWxpc3QuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLCtDQUErQztBQUNuRDtBQUNBO0lBQ0ksK0NBQStDO0FBQ25EIiwic291cmNlc0NvbnRlbnQiOlsiLm9sZFNlYXNvbiB7IFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyMzMsIDIzMywgMjMzKSAhaW1wb3J0YW50O1xufVxuLmZ1dHVyZVRvdXJuYW1lbnQgeyBcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjU1LCAyNTUsIDE5MSkgIWltcG9ydGFudDtcbn0iXSwic291cmNlUm9vdCI6IiJ9 */"]
    });
  }
}

/***/ }),

/***/ 2683:
/*!****************************************************!*\
  !*** ./src/app/pages/profile/profile.component.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProfileComponent: () => (/* binding */ ProfileComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 2481);
/* harmony import */ var _auth0_auth0_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @auth0/auth0-angular */ 7989);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 3683);
/* harmony import */ var ngx_highlightjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-highlightjs */ 7725);




function ProfileComponent_div_0_div_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 8)(1, "pre", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "code", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("highlight", ctx_r0.profileJson);
  }
}
function ProfileComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 1)(1, "div", 2)(2, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "img", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 5)(5, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "p", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, ProfileComponent_div_0_div_9_Template, 3, 1, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const user_r2 = ctx.ngIf;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", user_r2.picture, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](user_r2.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](user_r2.email);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0.profileJson);
  }
}
class ProfileComponent {
  constructor(auth) {
    this.auth = auth;
    this.profileJson = null;
  }
  ngOnInit() {
    this.auth.user$.subscribe(profile => this.profileJson = JSON.stringify(profile, null, 2));
  }
  static {
    this.ɵfac = function ProfileComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || ProfileComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_auth0_auth0_angular__WEBPACK_IMPORTED_MODULE_1__.AuthService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: ProfileComponent,
      selectors: [["app-profile"]],
      standalone: false,
      decls: 2,
      vars: 3,
      consts: [["class", "container mt-5", 4, "ngIf"], [1, "container", "mt-5"], [1, "row", "align-items-center", "profile-header", "mb-5", "text-center", "text-md-left"], [1, "col-md-2"], [1, "rounded-circle", "img-fluid", "profile-picture", "mb-3", "mb-md-0", 3, "src"], [1, "col-md"], [1, "lead", "text-muted"], ["class", "row", 4, "ngIf"], [1, "row"], [1, "rounded"], [1, "json", 3, "highlight"]],
      template: function ProfileComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, ProfileComponent_div_0_Template, 10, 4, "div", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](1, "async");
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](1, 1, ctx.auth.user$));
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf, ngx_highlightjs__WEBPACK_IMPORTED_MODULE_3__.Highlight, _angular_common__WEBPACK_IMPORTED_MODULE_2__.AsyncPipe],
      styles: [".userImg[_ngcontent-%COMP%] {\n  border-radius: 100px;\n  display: block;\n  height: 100px;\n  margin: 0 auto;\n  width: 100px;\n}\n\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcGFnZXMvcHJvZmlsZS9wcm9maWxlLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxvQkFBb0I7RUFDcEIsY0FBYztFQUNkLGFBQWE7RUFDYixjQUFjO0VBQ2QsWUFBWTtBQUNkIiwic291cmNlc0NvbnRlbnQiOlsiLnVzZXJJbWcge1xuICBib3JkZXItcmFkaXVzOiAxMDBweDtcbiAgZGlzcGxheTogYmxvY2s7XG4gIGhlaWdodDogMTAwcHg7XG4gIG1hcmdpbjogMCBhdXRvO1xuICB3aWR0aDogMTAwcHg7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
    });
  }
}

/***/ }),

/***/ 3057:
/*!*****************************************************************!*\
  !*** ./src/app/components/bowler-exists-validator.directive.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BowlerExistsValidator: () => (/* binding */ BowlerExistsValidator),
/* harmony export */   BowlerExistsValidatorDirective: () => (/* binding */ BowlerExistsValidatorDirective)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 4205);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 9452);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 1318);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 271);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2481);
/* harmony import */ var _services_api_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @services/api.service */ 3366);





//see: https://angular.io/guide/form-validation#implementing-a-custom-async-validator
class BowlerExistsValidator {
  constructor(api) {
    this.api = api;
  }
  validate(control) {
    return this.api.bowlers$().pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.map)(bowlers => bowlers.filter(x => x.Name === control.value).length === 1 ? null : {
      message: `${control.value} is not found`,
      type: 'MissingBowler'
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.catchError)(() => (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.of)(null)));
  }
  static {
    this.ɵfac = function BowlerExistsValidator_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || BowlerExistsValidator)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_services_api_service__WEBPACK_IMPORTED_MODULE_6__.ApiService));
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
      token: BowlerExistsValidator,
      factory: BowlerExistsValidator.ɵfac,
      providedIn: 'root'
    });
  }
}
class BowlerExistsValidatorDirective {
  constructor(validator) {
    this.validator = validator;
  }
  validate(control) {
    return this.validator.validate(control);
  }
  static {
    this.ɵfac = function BowlerExistsValidatorDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || BowlerExistsValidatorDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](BowlerExistsValidator));
    };
  }
  static {
    this.ɵdir = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineDirective"]({
      type: BowlerExistsValidatorDirective,
      selectors: [["", "appBowlerExists", ""]],
      standalone: false,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵProvidersFeature"]([{
        provide: _angular_forms__WEBPACK_IMPORTED_MODULE_1__.NG_ASYNC_VALIDATORS,
        useExisting: (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => BowlerExistsValidatorDirective),
        multi: true
      }])]
    });
  }
}

/***/ }),

/***/ 3342:
/*!**************************************************!*\
  !*** ./src/app/models/TournamentUploadRecord.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TournamentUploadRecord: () => (/* binding */ TournamentUploadRecord)
/* harmony export */ });
class TournamentUploadRecord {
  ensureTypes() {
    const orZero = x => 1 * (Number.isNaN(Number.parseInt(`${x}`)) ? 0 : x);
    this.Game1 = orZero(this.Game1);
    this.Game2 = orZero(this.Game2);
    this.Game3 = orZero(this.Game3);
    this.Game4 = orZero(this.Game4);
    this.Game5 = orZero(this.Game5);
    this.Game6 = orZero(this.Game6);
    this.Game7 = orZero(this.Game7);
    this.Game8 = orZero(this.Game8);
    this.Average = orZero(this.Average);
    return this;
  }
  scratch() {
    return 0 + this.Game1 + this.Game2 + this.Game3 + this.Game4 + this.Game5 + this.Game6 + this.Game7 + this.Game8;
  }
  poa() {
    return !this.Average || this.Average === 450 ? undefined : 0 + (!!this.Game1 || this.Game1 > 0 ? this.Game1 - this.Average : 0) + (!!this.Game2 || this.Game2 > 0 ? this.Game2 - this.Average : 0) + (!!this.Game3 || this.Game3 > 0 ? this.Game3 - this.Average : 0) + (!!this.Game4 || this.Game4 > 0 ? this.Game4 - this.Average : 0) + (!!this.Game5 || this.Game5 > 0 ? this.Game5 - this.Average : 0) + (!!this.Game6 || this.Game6 > 0 ? this.Game6 - this.Average : 0) + (!!this.Game7 || this.Game7 > 0 ? this.Game7 - this.Average : 0) + (!!this.Game8 || this.Game8 > 0 ? this.Game8 - this.Average : 0);
  }
}

/***/ }),

/***/ 3366:
/*!*****************************************!*\
  !*** ./src/app/services/api.service.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ApiService: () => (/* binding */ ApiService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 9452);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 271);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 6301);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../environments/environment */ 5312);
/* harmony import */ var _models_BowlerRecord__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @models/BowlerRecord */ 547);
/* harmony import */ var _models_ContentBlockRecord__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @models/ContentBlockRecord */ 9762);
/* harmony import */ var _models_SeasonRecord__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @models/SeasonRecord */ 209);
/* harmony import */ var _models_TournamentRecord__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @models/TournamentRecord */ 3903);
/* harmony import */ var _models_TournamentResultsRecord__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @models/TournamentResultsRecord */ 9775);
/* harmony import */ var _models_BowlerResultsRecord__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @models/BowlerResultsRecord */ 4747);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 4205);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common/http */ 3855);










class ApiService {
  constructor(http) {
    this.http = http;
    this.cache = {};
    this.fromCache = route => {
      return this.cache?.[route] ? this.cache[route] : this.cache[route] = this.http.get(`${_environments_environment__WEBPACK_IMPORTED_MODULE_3__.environment.apiUri}${route}`).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.shareReplay)(1));
    };
    this.clearCache = route => {
      if (!route) this.cache = {};
      if (route && this.cache?.[route]) this.cache[route] = undefined;
    };
  }
  contentBlocks$(key = "") {
    return this.fromCache(`contentblocks/${key}`).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.map)(z => z.map(x => Object.assign(new _models_ContentBlockRecord__WEBPACK_IMPORTED_MODULE_5__.ContentBlockRecord(), x))));
  }
  seasons$() {
    return this.fromCache('seasons').pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.map)(z => z.map(x => Object.assign(new _models_SeasonRecord__WEBPACK_IMPORTED_MODULE_6__.SeasonRecord(), x))));
  }
  bowlers$() {
    return this.fromCache('bowlers').pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.map)(z => z.map(x => Object.assign(new _models_BowlerRecord__WEBPACK_IMPORTED_MODULE_4__.BowlerRecord(), x))));
  }
  bowlerResults$(bowlerId) {
    if (!bowlerId) return (0,rxjs__WEBPACK_IMPORTED_MODULE_0__.of)([]);
    return this.fromCache(`bowlerresults/${bowlerId}`).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.map)(z => z.map(x => Object.assign(new _models_BowlerResultsRecord__WEBPACK_IMPORTED_MODULE_9__.BowlerResultsRecord(), x).ensureTypes())));
  }
  tournaments$() {
    return this.fromCache('tournaments').pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.map)(z => z.map(x => Object.assign(new _models_TournamentRecord__WEBPACK_IMPORTED_MODULE_7__.TournamentRecord(), x))));
  }
  tournamentResults$(tournamentId) {
    if (!tournamentId) return (0,rxjs__WEBPACK_IMPORTED_MODULE_0__.of)([]);
    return this.fromCache(`tournamentresults/${tournamentId}`).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.map)(z => z.map(x => Object.assign(new _models_TournamentResultsRecord__WEBPACK_IMPORTED_MODULE_8__.TournamentResultsRecord(), x).ensureTypes())));
  }
  saveTournamentResults(tournamentId, results) {
    return this.http.put(`${_environments_environment__WEBPACK_IMPORTED_MODULE_3__.environment.apiUri}tournamentresults/${tournamentId}`, results).subscribe(() => this.clearCache(`tournamentresults/${tournamentId}`));
  }
  saveContentBlock(key, contentHtml) {
    return this.http.post(`${_environments_environment__WEBPACK_IMPORTED_MODULE_3__.environment.apiUri}contentblocks/save`, {
      contentBlock: key,
      contentHTML: contentHtml
    }).subscribe(() => this.clearCache(`contentblocks/${key}`));
  }
  whoami() {
    return this.http.get(`${_environments_environment__WEBPACK_IMPORTED_MODULE_3__.environment.apiUri}whoami`);
  }
  static {
    this.ɵfac = function ApiService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || ApiService)(_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_11__.HttpClient));
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineInjectable"]({
      token: ApiService,
      factory: ApiService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ }),

/***/ 3663:
/*!****************************************************************************!*\
  !*** ./src/app/pages/content-blocks-page/content-blocks-page.component.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ContentBlocksPageComponent: () => (/* binding */ ContentBlocksPageComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 2481);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 5422);


class ContentBlocksPageComponent {
  static {
    this.ɵfac = function ContentBlocksPageComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || ContentBlocksPageComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: ContentBlocksPageComponent,
      selectors: [["app-content-blocks-page"]],
      standalone: false,
      decls: 5,
      vars: 0,
      consts: [[1, "justify"], [1, "list"], ["name", "list"], [1, "editor"], ["name", "editor"]],
      template: function ContentBlocksPageComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "div", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "router-outlet", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "router-outlet", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        }
      },
      dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterOutlet],
      styles: ["\n\n\n.list[_ngcontent-%COMP%] {\n    width: 25%;\n}\n.editor[_ngcontent-%COMP%] {\n    width: 75%;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcGFnZXMvY29udGVudC1ibG9ja3MtcGFnZS9jb250ZW50LWJsb2Nrcy1wYWdlLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsZ0ZBQWdGOztBQUVoRjtJQUNJLFVBQVU7QUFDZDtBQUNBO0lBQ0ksVUFBVTtBQUNkIiwic291cmNlc0NvbnRlbnQiOlsiLyogSWYgeW91IHdhbnQgdG8gb3ZlcnJpZGUgUXVpbGwgc3R5bGVzLCB5b3UgbmVlZCB0byBnbyB0byB0aGUgcm9vdCBzdHlsZXMuY3NzICovXG5cbi5saXN0IHtcbiAgICB3aWR0aDogMjUlO1xufVxuLmVkaXRvciB7XG4gICAgd2lkdGg6IDc1JTtcbn0iXSwic291cmNlUm9vdCI6IiJ9 */"]
    });
  }
}

/***/ }),

/***/ 3903:
/*!********************************************!*\
  !*** ./src/app/models/TournamentRecord.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TournamentRecord: () => (/* binding */ TournamentRecord)
/* harmony export */ });
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ 9545);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);

class TournamentRecord {
  date() {
    return moment__WEBPACK_IMPORTED_MODULE_0___default()(this.TournamentDetails, ['DDMMMMY hh:mm:ss a', 'MMMMDDY hh:mm:ss a']).toDate();
  }
}

/***/ }),

/***/ 4114:
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppRoutingModule: () => (/* binding */ AppRoutingModule)
/* harmony export */ });
/* harmony import */ var _auth0_auth0_angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @auth0/auth0-angular */ 7989);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 4487);
/* harmony import */ var _pages_home_home_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @pages/home/home.component */ 5047);
/* harmony import */ var _pages_profile_profile_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @pages/profile/profile.component */ 2683);
/* harmony import */ var _pages_tournament_page_tournament_page_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @pages/tournament-page/tournament-page.component */ 4859);
/* harmony import */ var _pages_error_error_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @pages/error/error.component */ 8939);
/* harmony import */ var _pages_tournament_upload_page_tournament_upload_page_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @pages/tournament-upload-page/tournament-upload-page.component */ 6699);
/* harmony import */ var _pages_tournament_edit_page_tournament_edit_page_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @pages/tournament-edit-page/tournament-edit-page.component */ 8893);
/* harmony import */ var _pages_bowler_page_bowler_page_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @pages/bowler-page/bowler-page.component */ 6379);
/* harmony import */ var _components_bowler_results_bowler_results_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @components/bowler-results/bowler-results.component */ 1727);
/* harmony import */ var _components_tournament_summary_tournament_summary_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @components/tournament-summary/tournament-summary.component */ 227);
/* harmony import */ var _components_tournament_viewer_tournament_viewer_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @components/tournament-viewer/tournament-viewer.component */ 1529);
/* harmony import */ var _components_bowler_stats_bowler_stats_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @components/bowler-stats/bowler-stats.component */ 6437);
/* harmony import */ var _pages_schedule_page_schedule_page_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @pages/schedule-page/schedule-page.component */ 1383);
/* harmony import */ var _pages_content_blocks_page_content_blocks_page_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @pages/content-blocks-page/content-blocks-page.component */ 3663);
/* harmony import */ var _components_content_block_list_content_block_list_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @components/content-block-list/content-block-list.component */ 1255);
/* harmony import */ var _components_content_block_editor_content_block_editor_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @components/content-block-editor/content-block-editor.component */ 2349);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/core */ 4205);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/core */ 2481);



















// https://stackblitz.com/run?file=src/app/app-routing.module.ts
const routes = [{
  path: 'profile',
  component: _pages_profile_profile_component__WEBPACK_IMPORTED_MODULE_3__.ProfileComponent,
  canActivate: [_auth0_auth0_angular__WEBPACK_IMPORTED_MODULE_0__.AuthGuard]
}, {
  path: 'error',
  component: _pages_error_error_component__WEBPACK_IMPORTED_MODULE_5__.ErrorComponent
}, {
  path: '',
  component: _pages_home_home_component__WEBPACK_IMPORTED_MODULE_2__.HomeComponent,
  pathMatch: 'full'
}, {
  path: 'schedule',
  component: _pages_schedule_page_schedule_page_component__WEBPACK_IMPORTED_MODULE_13__.SchedulePageComponent
}, {
  path: 'contentblocks',
  component: _pages_content_blocks_page_content_blocks_page_component__WEBPACK_IMPORTED_MODULE_14__.ContentBlocksPageComponent,
  children: [{
    path: '',
    component: _components_content_block_list_content_block_list_component__WEBPACK_IMPORTED_MODULE_15__.ContentBlockListComponent,
    outlet: "list"
  }]
}, {
  path: 'contentblocks/:key',
  component: _pages_content_blocks_page_content_blocks_page_component__WEBPACK_IMPORTED_MODULE_14__.ContentBlocksPageComponent,
  children: [{
    path: '',
    component: _components_content_block_list_content_block_list_component__WEBPACK_IMPORTED_MODULE_15__.ContentBlockListComponent,
    outlet: "list"
  }, {
    path: '',
    component: _components_content_block_editor_content_block_editor_component__WEBPACK_IMPORTED_MODULE_16__.ContentBlockEditorComponent,
    outlet: "editor"
  }]
}, {
  path: 'results/:division',
  component: _pages_tournament_page_tournament_page_component__WEBPACK_IMPORTED_MODULE_4__.TournamentPageComponent
}, {
  path: 'results/:division/:season',
  component: _pages_tournament_page_tournament_page_component__WEBPACK_IMPORTED_MODULE_4__.TournamentPageComponent,
  children: [{
    path: '0',
    component: _components_tournament_summary_tournament_summary_component__WEBPACK_IMPORTED_MODULE_10__.TournamentSummaryComponent
  }, {
    path: ':tournament',
    component: _components_tournament_viewer_tournament_viewer_component__WEBPACK_IMPORTED_MODULE_11__.TournamentViewerComponent
  }, {
    path: ':tournament/upload',
    component: _pages_tournament_upload_page_tournament_upload_page_component__WEBPACK_IMPORTED_MODULE_6__.TournamentUploadPageComponent,
    pathMatch: 'full',
    canActivate: [_auth0_auth0_angular__WEBPACK_IMPORTED_MODULE_0__.AuthGuard]
  }, {
    path: ':tournament/edit',
    component: _pages_tournament_edit_page_tournament_edit_page_component__WEBPACK_IMPORTED_MODULE_7__.TournamentEditPageComponent,
    pathMatch: 'full',
    canActivate: [_auth0_auth0_angular__WEBPACK_IMPORTED_MODULE_0__.AuthGuard]
  }]
}, {
  path: 'bowlers/:bowler',
  component: _pages_bowler_page_bowler_page_component__WEBPACK_IMPORTED_MODULE_8__.BowlerPageComponent,
  children: [{
    path: '',
    component: _components_bowler_stats_bowler_stats_component__WEBPACK_IMPORTED_MODULE_12__.BowlerStatsComponent,
    outlet: "stats"
  }, {
    path: '',
    component: _components_bowler_results_bowler_results_component__WEBPACK_IMPORTED_MODULE_9__.BowlerResultsComponent,
    outlet: "results"
  }]
}];
class AppRoutingModule {
  static {
    this.ɵfac = function AppRoutingModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || AppRoutingModule)();
    };
  }
  static {
    this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵdefineNgModule"]({
      type: AppRoutingModule
    });
  }
  static {
    this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdefineInjector"]({
      imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule.forRoot(routes, {
        bindToComponentInputs: true,
        paramsInheritanceStrategy: 'always'
      }), _angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule]
    });
  }
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵsetNgModuleScope"](AppRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule]
  });
})();

/***/ }),

/***/ 4429:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ 2190);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ 635);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ 5312);




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__.environment.production) {
  (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.enableProdMode)();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__.platformBrowser().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__.AppModule).catch(err => console.error(err));

/***/ }),

/***/ 4747:
/*!***********************************************!*\
  !*** ./src/app/models/BowlerResultsRecord.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BowlerResultsRecord: () => (/* binding */ BowlerResultsRecord)
/* harmony export */ });
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ 9545);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);

class BowlerResultsRecord {
  ensureTypes() {
    const orZero = x => 1 * (Number.isNaN(Number.parseInt(`${x}`)) ? 0 : x);
    this.Game1 = orZero(this.Game1);
    this.Game2 = orZero(this.Game2);
    this.Game3 = orZero(this.Game3);
    this.Game4 = orZero(this.Game4);
    this.Game5 = orZero(this.Game5);
    this.Game6 = orZero(this.Game6);
    this.Game7 = orZero(this.Game7);
    this.Game8 = orZero(this.Game8);
    this.BowlerAverage = orZero(this.BowlerAverage);
    this.IgnoreForAverage = !!this.IgnoreForAverage;
    return this;
  }
  date() {
    return moment__WEBPACK_IMPORTED_MODULE_0___default()(this.TournamentDetails, ['DDMMMMY', 'MMMMDDY']).toDate();
  }
  scratch() {
    return 0 + this.Game1 + this.Game2 + this.Game3 + this.Game4 + this.Game5 + this.Game6 + this.Game7 + this.Game8;
  }
  poa() {
    return !this.BowlerAverage || this.BowlerAverage === 450 ? undefined : 0 + (!!this.Game1 || this.Game1 > 0 ? this.Game1 - this.BowlerAverage : 0) + (!!this.Game2 || this.Game2 > 0 ? this.Game2 - this.BowlerAverage : 0) + (!!this.Game3 || this.Game3 > 0 ? this.Game3 - this.BowlerAverage : 0) + (!!this.Game4 || this.Game4 > 0 ? this.Game4 - this.BowlerAverage : 0) + (!!this.Game5 || this.Game5 > 0 ? this.Game5 - this.BowlerAverage : 0) + (!!this.Game6 || this.Game6 > 0 ? this.Game6 - this.BowlerAverage : 0) + (!!this.Game7 || this.Game7 > 0 ? this.Game7 - this.BowlerAverage : 0) + (!!this.Game8 || this.Game8 > 0 ? this.Game8 - this.BowlerAverage : 0);
  }
}

/***/ }),

/***/ 4769:
/*!*****************************************************************************!*\
  !*** ./src/app/components/upload-tournament/upload-tournament.component.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UploadTournamentComponent: () => (/* binding */ UploadTournamentComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 2481);
/* harmony import */ var _services_tournament_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @services/tournament.service */ 9093);



class UploadTournamentComponent {
  constructor(tournamentService) {
    this.tournamentService = tournamentService;
    this.tournamentUploadedEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
  }
  onPaste($event) {
    let clipboardData = $event.clipboardData;
    let clipboardText = clipboardData.getData('text');
    let results = this.tournamentService.parseUpload(clipboardText);
    this.tournamentUploadedEvent.emit(results);
  }
  static {
    this.ɵfac = function UploadTournamentComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || UploadTournamentComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_tournament_service__WEBPACK_IMPORTED_MODULE_1__.TournamentService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: UploadTournamentComponent,
      selectors: [["app-upload-tournament"]],
      hostBindings: function UploadTournamentComponent_HostBindings(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("paste", function UploadTournamentComponent_paste_HostBindingHandler($event) {
            return ctx.onPaste($event);
          });
        }
      },
      outputs: {
        tournamentUploadedEvent: "tournamentUploadedEvent"
      },
      standalone: false,
      decls: 16,
      vars: 0,
      consts: [["id", "upload"]],
      template: function UploadTournamentComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "ol")(2, "li");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Copy (ctrl-v) from excel/google sheets/etc");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "ul")(5, "li");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "No headings");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "li");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Click here and paste your data (ctrl-v)");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "li");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "Review the data below");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "ul")(12, "li");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "And make changes if you need!");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "li");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "Click save");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
        }
      },
      styles: ["#upload[_ngcontent-%COMP%] {\n    border: 1pt solid #ccc;\n    display: block;\n    margin: 1em;\n    margin-left: auto;\n    margin-right: auto;\n    height: 300px;\n    padding: 1em;\n    background-image: url('paste_here.png');\n    background-repeat: no-repeat;\n    background-position: bottom right;\n    background-size: 50%;\n    font-size: 16pt;\n    font-weight: bold;\n}\n\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29tcG9uZW50cy91cGxvYWQtdG91cm5hbWVudC91cGxvYWQtdG91cm5hbWVudC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksc0JBQXNCO0lBQ3RCLGNBQWM7SUFDZCxXQUFXO0lBQ1gsaUJBQWlCO0lBQ2pCLGtCQUFrQjtJQUNsQixhQUFhO0lBQ2IsWUFBWTtJQUNaLHVDQUFtRDtJQUNuRCw0QkFBNEI7SUFDNUIsaUNBQWlDO0lBQ2pDLG9CQUFvQjtJQUNwQixlQUFlO0lBQ2YsaUJBQWlCO0FBQ3JCIiwic291cmNlc0NvbnRlbnQiOlsiI3VwbG9hZCB7XG4gICAgYm9yZGVyOiAxcHQgc29saWQgI2NjYztcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICBtYXJnaW46IDFlbTtcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcbiAgICBtYXJnaW4tcmlnaHQ6IGF1dG87XG4gICAgaGVpZ2h0OiAzMDBweDtcbiAgICBwYWRkaW5nOiAxZW07XG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCd+c3JjL2Fzc2V0cy9wYXN0ZV9oZXJlLnBuZycpO1xuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogYm90dG9tIHJpZ2h0O1xuICAgIGJhY2tncm91bmQtc2l6ZTogNTAlO1xuICAgIGZvbnQtc2l6ZTogMTZwdDtcbiAgICBmb250LXdlaWdodDogYm9sZDtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
    });
  }
}

/***/ }),

/***/ 4859:
/*!********************************************************************!*\
  !*** ./src/app/pages/tournament-page/tournament-page.component.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TournamentPageComponent: () => (/* binding */ TournamentPageComponent)
/* harmony export */ });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ 271);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2481);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 5422);
/* harmony import */ var _services_api_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @services/api.service */ 3366);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 3683);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/form-field */ 8388);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/select */ 8724);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/select */ 6060);







function TournamentPageComponent_mat_option_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-option", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const s_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", s_r1.SeasonCode);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](s_r1.SeasonDesc);
  }
}
function TournamentPageComponent_mat_option_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-option", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const t_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", t_r2.Id);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate2"]("", t_r2.TournamentNumber, " - ", t_r2.TournamentLocation);
  }
}
class TournamentPageComponent {
  constructor(route, router, api) {
    this.route = route;
    this.router = router;
    this.api = api;
    this.tournamentResults = [];
    this.changeSeason = seasonCode => {
      this.router.navigate(['/results', this.division, seasonCode, 0]);
    };
    this.changeTournament = tournament => {
      this.router.navigate(['/results', this.division, this.season, tournament]);
    };
    this.onSeasonChange = seasonCode => {
      this.api.tournaments$().subscribe(tournaments => {
        this.tournaments = tournaments.filter(x => x.Division.localeCompare(this.division, undefined, {
          sensitivity: 'base'
        }) === 0).filter(x => x.SeasonCode === seasonCode);
        this.tournaments.sort((x, y) => x.TournamentNumber - y.TournamentNumber);
      });
    };
  }
  ngOnDestroy() {
    this.season$.unsubscribe();
  }
  ngOnInit() {
    this.api.seasons$().subscribe(seasons => {
      this.seasons = seasons;
      this.seasons.sort((x, y) => x.SeasonDesc.localeCompare(y.SeasonDesc) * -1);
      if (!this.route.snapshot.params['season']) {
        this.changeSeason(this.seasons[0].SeasonCode);
      }
    });
    this.season$ = this.route.params.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_0__.map)(x => x.season)).subscribe(this.onSeasonChange);
  }
  static {
    this.ɵfac = function TournamentPageComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || TournamentPageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_api_service__WEBPACK_IMPORTED_MODULE_3__.ApiService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
      type: TournamentPageComponent,
      selectors: [["app-tournament-page"]],
      inputs: {
        division: "division",
        season: "season"
      },
      standalone: false,
      decls: 10,
      vars: 3,
      consts: [["matNativeControl", "", 3, "selectionChange", "valueChange", "value"], [3, "value", 4, "ngFor", "ngForOf"], [3, "selectionChange"], ["value", "0", "selected", ""], [1, "container", "flex-grow-1", "flex-shrink-1"], [3, "value"]],
      template: function TournamentPageComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-form-field")(1, "mat-select", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("selectionChange", function TournamentPageComponent_Template_mat_select_selectionChange_1_listener($event) {
            return ctx.changeSeason($event.value);
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayListener"]("valueChange", function TournamentPageComponent_Template_mat_select_valueChange_1_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayBindingSet"](ctx.season, $event) || (ctx.season = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, TournamentPageComponent_mat_option_2_Template, 2, 2, "mat-option", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "mat-form-field")(4, "mat-select", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("selectionChange", function TournamentPageComponent_Template_mat_select_selectionChange_4_listener($event) {
            return ctx.changeTournament($event.value * 1);
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "mat-option", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "Summary");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](7, TournamentPageComponent_mat_option_7_Template, 2, 3, "mat-option", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "div", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](9, "router-outlet");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtwoWayProperty"]("value", ctx.season);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.seasons);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.tournaments);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.NgForOf, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterOutlet, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__.MatFormField, _angular_material_select__WEBPACK_IMPORTED_MODULE_7__.MatSelect, _angular_material_select__WEBPACK_IMPORTED_MODULE_6__.MatOption],
      styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ }),

/***/ 5047:
/*!**********************************************!*\
  !*** ./src/app/pages/home/home.component.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HomeComponent: () => (/* binding */ HomeComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 2481);
/* harmony import */ var _auth0_auth0_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @auth0/auth0-angular */ 7989);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 3683);
/* harmony import */ var _components_home_content_home_content_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/home-content/home-content.component */ 1257);
/* harmony import */ var _components_loading_loading_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/loading/loading.component */ 8325);





function HomeComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "app-loading");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function HomeComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-home-content");
  }
}
class HomeComponent {
  constructor(auth) {
    this.auth = auth;
  }
  static {
    this.ɵfac = function HomeComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || HomeComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_auth0_auth0_angular__WEBPACK_IMPORTED_MODULE_1__.AuthService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: HomeComponent,
      selectors: [["app-home"]],
      standalone: false,
      decls: 4,
      vars: 4,
      consts: [["loaded", ""], ["class", "container", 4, "ngIf", "ngIfElse"], [1, "container"]],
      template: function HomeComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, HomeComponent_div_0_Template, 2, 0, "div", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](1, "async");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, HomeComponent_ng_template_2_Template, 1, 0, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
        }
        if (rf & 2) {
          const loaded_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](1, 2, ctx.auth.isLoading$))("ngIfElse", loaded_r1);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf, _components_home_content_home_content_component__WEBPACK_IMPORTED_MODULE_3__.HomeContentComponent, _components_loading_loading_component__WEBPACK_IMPORTED_MODULE_4__.LoadingComponent, _angular_common__WEBPACK_IMPORTED_MODULE_2__.AsyncPipe],
      styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ }),

/***/ 5312:
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   environment: () => (/* binding */ environment)
/* harmony export */ });
/* harmony import */ var _auth_config_local_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../auth_config.local.json */ 7274);
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const {
  domain,
  clientId,
  authorizationParams: {
    audience
  },
  apiUri,
  errorPath
} = _auth_config_local_json__WEBPACK_IMPORTED_MODULE_0__;
// Optional local secret file for keys (gitignored)
let tinymceApiKey = '';
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const secret = __webpack_require__(/*! ./tinymce.secret.json */ 2245);
  tinymceApiKey = secret.tinymceApiKey || secret.apiKey || '';
} catch {
  tinymceApiKey = '';
}
const environment = {
  production: false,
  apiUri: _auth_config_local_json__WEBPACK_IMPORTED_MODULE_0__.apiUri,
  auth: {
    domain,
    clientId,
    authorizationParams: {
      ...(audience && audience !== 'YOUR_API_IDENTIFIER' ? {
        audience
      } : null),
      redirect_uri: window.location.origin
    },
    errorPath
  },
  httpInterceptor: {
    //https://github.com/auth0/auth0-angular/blob/main/EXAMPLES.md
    allowedList: [{
      uri: `${apiUri}/*`,
      allowAnonymous: true
    }]
  },
  tinymceApiKey
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

/***/ }),

/***/ 5313:
/*!*****************************************************************************!*\
  !*** ./src/app/components/tournament-editor/tournament-editor.component.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TournamentEditorComponent: () => (/* binding */ TournamentEditorComponent)
/* harmony export */ });
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/material/sort */ 2047);
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/table */ 78);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 4205);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 2481);
/* harmony import */ var _services_api_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @services/api.service */ 3366);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 3683);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 4487);
/* harmony import */ var _bowler_exists_validator_directive__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../bowler-exists-validator.directive */ 3057);
/* harmony import */ var _pipes_append_values_pipe__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../pipes/append-values.pipe */ 7287);











function TournamentEditorComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const error_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", error_r2.message, " ");
  }
}
function TournamentEditorComponent_th_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "th", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " Name ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function TournamentEditorComponent_td_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "td", 25)(1, "input", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](2, "appendValues");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayListener"]("ngModelChange", function TournamentEditorComponent_td_11_Template_input_ngModelChange_1_listener($event) {
      const element_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r3).$implicit;
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayBindingSet"](element_r4.Bowler, $event) || (element_r4.Bowler = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const element_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("name", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind2"](2, 2, "Bowler", element_r4.BowlerId));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayProperty"]("ngModel", element_r4.Bowler);
  }
}
function TournamentEditorComponent_th_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "th", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "Avg");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function TournamentEditorComponent_td_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "td", 25)(1, "input", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](2, "appendValues");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayListener"]("ngModelChange", function TournamentEditorComponent_td_14_Template_input_ngModelChange_1_listener($event) {
      const element_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r5).$implicit;
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayBindingSet"](element_r6.Average, $event) || (element_r6.Average = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const element_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("name", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind2"](2, 2, "Average", element_r6.BowlerId));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayProperty"]("ngModel", element_r6.Average);
  }
}
function TournamentEditorComponent_th_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "th", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "1");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function TournamentEditorComponent_td_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "td", 25)(1, "input", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](2, "appendValues");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayListener"]("ngModelChange", function TournamentEditorComponent_td_17_Template_input_ngModelChange_1_listener($event) {
      const element_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r7).$implicit;
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayBindingSet"](element_r8.Game1, $event) || (element_r8.Game1 = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const element_r8 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("name", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind2"](2, 2, "Game1", element_r8.BowlerId));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayProperty"]("ngModel", element_r8.Game1);
  }
}
function TournamentEditorComponent_th_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "th", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "2");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function TournamentEditorComponent_td_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "td", 25)(1, "input", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](2, "appendValues");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayListener"]("ngModelChange", function TournamentEditorComponent_td_20_Template_input_ngModelChange_1_listener($event) {
      const element_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r9).$implicit;
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayBindingSet"](element_r10.Game2, $event) || (element_r10.Game2 = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const element_r10 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("name", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind2"](2, 2, "Game2", element_r10.BowlerId));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayProperty"]("ngModel", element_r10.Game2);
  }
}
function TournamentEditorComponent_th_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "th", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "3");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function TournamentEditorComponent_td_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "td", 25)(1, "input", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](2, "appendValues");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayListener"]("ngModelChange", function TournamentEditorComponent_td_23_Template_input_ngModelChange_1_listener($event) {
      const element_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r11).$implicit;
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayBindingSet"](element_r12.Game3, $event) || (element_r12.Game3 = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const element_r12 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("name", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind2"](2, 2, "Game3", element_r12.BowlerId));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayProperty"]("ngModel", element_r12.Game3);
  }
}
function TournamentEditorComponent_th_25_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "th", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "4");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function TournamentEditorComponent_td_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "td", 25)(1, "input", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](2, "appendValues");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayListener"]("ngModelChange", function TournamentEditorComponent_td_26_Template_input_ngModelChange_1_listener($event) {
      const element_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r13).$implicit;
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayBindingSet"](element_r14.Game4, $event) || (element_r14.Game4 = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const element_r14 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("name", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind2"](2, 2, "Game4", element_r14.BowlerId));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayProperty"]("ngModel", element_r14.Game4);
  }
}
function TournamentEditorComponent_th_28_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "th", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "5");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function TournamentEditorComponent_td_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "td", 25)(1, "input", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](2, "appendValues");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayListener"]("ngModelChange", function TournamentEditorComponent_td_29_Template_input_ngModelChange_1_listener($event) {
      const element_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r15).$implicit;
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayBindingSet"](element_r16.Game5, $event) || (element_r16.Game5 = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const element_r16 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("name", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind2"](2, 2, "Game5", element_r16.BowlerId));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayProperty"]("ngModel", element_r16.Game5);
  }
}
function TournamentEditorComponent_th_31_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "th", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "6");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function TournamentEditorComponent_td_32_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "td", 25)(1, "input", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](2, "appendValues");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayListener"]("ngModelChange", function TournamentEditorComponent_td_32_Template_input_ngModelChange_1_listener($event) {
      const element_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r17).$implicit;
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayBindingSet"](element_r18.Game6, $event) || (element_r18.Game6 = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const element_r18 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("name", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind2"](2, 2, "Game6", element_r18.BowlerId));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayProperty"]("ngModel", element_r18.Game6);
  }
}
function TournamentEditorComponent_th_34_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "th", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "7");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function TournamentEditorComponent_td_35_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "td", 25)(1, "input", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](2, "appendValues");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayListener"]("ngModelChange", function TournamentEditorComponent_td_35_Template_input_ngModelChange_1_listener($event) {
      const element_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r19).$implicit;
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayBindingSet"](element_r20.Game7, $event) || (element_r20.Game7 = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const element_r20 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("name", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind2"](2, 2, "Game7", element_r20.BowlerId));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayProperty"]("ngModel", element_r20.Game7);
  }
}
function TournamentEditorComponent_th_37_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "th", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "8");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function TournamentEditorComponent_td_38_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "td", 25)(1, "input", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](2, "appendValues");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayListener"]("ngModelChange", function TournamentEditorComponent_td_38_Template_input_ngModelChange_1_listener($event) {
      const element_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r21).$implicit;
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayBindingSet"](element_r22.Game8, $event) || (element_r22.Game8 = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const element_r22 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("name", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind2"](2, 2, "Game8", element_r22.BowlerId));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayProperty"]("ngModel", element_r22.Game8);
  }
}
function TournamentEditorComponent_th_40_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "th", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " Scratch ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function TournamentEditorComponent_td_41_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "td", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const element_r23 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", element_r23.scratch(), " ");
  }
}
function TournamentEditorComponent_th_43_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "th", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " POA ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function TournamentEditorComponent_td_44_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "td", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const element_r24 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", element_r24.poa(), " ");
  }
}
function TournamentEditorComponent_tr_45_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "tr", 30);
  }
}
function TournamentEditorComponent_tr_46_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "tr", 31);
  }
}
class TournamentEditorComponent {
  constructor(api) {
    this.api = api;
    this.results = [];
    this.displayedColumns = ['Bowler', 'Game1', 'Game2', 'Game3', 'Game4', 'Game5', 'Game6', 'Game7', 'Game8', 'Average', 'Scratch', 'POA'];
    this.dataSource = new _angular_material_table__WEBPACK_IMPORTED_MODULE_1__.MatTableDataSource(this.results);
  }
  ngOnChanges(changes) {
    this.api.bowlers$().subscribe(bowlers => {
      this.bowlers = bowlers;
      this.dataSource.data = changes.results.currentValue.map((x, i) => {
        x.BowlerId = this.bowlers.find(b => b.Name === x.Bowler)?.ID || -i;
        return x;
      });
    });
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property.toLocaleLowerCase()) {
        case 'scratch':
          return item.scratch();
        case 'poa':
          return item.poa();
        default:
          return item[property];
      }
    };
  }
  onSubmit() {
    if (!window.confirm("Do you want to save?")) return;
    var data = this.results.map(c => {
      let record = {
        TournamentId: this.tournament,
        BowlerId: c.BowlerId,
        Game1: c.Game1,
        Game2: c.Game2,
        Game3: c.Game3,
        Game4: c.Game4,
        Game5: c.Game5,
        Game6: c.Game6,
        Game7: c.Game7,
        Game8: c.Game8,
        BowlerAverage: c.Average
      };
      //If there's an Id, tack it on, so it's an update, not an insert of a new record
      return !!c.Id ? {
        Id: c.Id,
        ...record
      } : record;
    });
    this.api.saveTournamentResults(this.tournament, data);
  }
  getErrors(form) {
    return Object.keys(form.controls).map(key => {
      const errors = form.controls[key].errors;
      return errors;
    }).filter(x => !!x);
  }
  static {
    this.ɵfac = function TournamentEditorComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || TournamentEditorComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_api_service__WEBPACK_IMPORTED_MODULE_4__.ApiService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
      type: TournamentEditorComponent,
      selectors: [["app-tournament-editor"]],
      viewQuery: function TournamentEditorComponent_Query(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_angular_material_sort__WEBPACK_IMPORTED_MODULE_0__.MatSort, 5);
        }
        if (rf & 2) {
          let _t;
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.sort = _t.first);
        }
      },
      inputs: {
        tournament: "tournament",
        results: "results"
      },
      standalone: false,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵNgOnChangesFeature"]],
      decls: 47,
      vars: 5,
      consts: [["tournamentForm", "ngForm"], ["name", "tournamentForm", 3, "ngSubmit"], [1, "justify"], ["routerLink", "..", 1, "nav-link"], ["type", "submit", 1, "btn", "btn-success", 3, "disabled"], [4, "ngFor", "ngForOf"], ["mat-table", "", "matSort", "", 1, "mat-elevation-z8", 3, "dataSource"], ["matColumnDef", "Bowler"], ["mat-header-cell", "", "mat-sort-header", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "Average"], ["mat-header-cell", "", "mat-sort-header", "", "width", "3em", 4, "matHeaderCellDef"], ["matColumnDef", "Game1"], ["matColumnDef", "Game2"], ["matColumnDef", "Game3"], ["matColumnDef", "Game4"], ["matColumnDef", "Game5"], ["matColumnDef", "Game6"], ["matColumnDef", "Game7"], ["matColumnDef", "Game8"], ["matColumnDef", "Scratch"], ["matColumnDef", "POA"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["mat-header-cell", "", "mat-sort-header", ""], ["mat-cell", ""], ["type", "text", "matInput", "", "required", "", "appBowlerExists", "", 3, "ngModelChange", "name", "ngModel"], ["mat-header-cell", "", "mat-sort-header", "", "width", "3em"], ["type", "number", "matInput", "", 3, "ngModelChange", "name", "ngModel"], ["matInput", "", 3, "ngModelChange", "name", "ngModel"], ["mat-header-row", ""], ["mat-row", ""]],
      template: function TournamentEditorComponent_Template(rf, ctx) {
        if (rf & 1) {
          const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "form", 1, 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngSubmit", function TournamentEditorComponent_Template_form_ngSubmit_0_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
            return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx.onSubmit());
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "div", 2)(3, "a", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, "Cancel");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "button", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6, "Save");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](7, TournamentEditorComponent_div_7_Template, 2, 1, "div", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "table", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](9, 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](10, TournamentEditorComponent_th_10_Template, 2, 0, "th", 8)(11, TournamentEditorComponent_td_11_Template, 3, 5, "td", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](12, 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](13, TournamentEditorComponent_th_13_Template, 2, 0, "th", 11)(14, TournamentEditorComponent_td_14_Template, 3, 5, "td", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](15, 12);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](16, TournamentEditorComponent_th_16_Template, 2, 0, "th", 11)(17, TournamentEditorComponent_td_17_Template, 3, 5, "td", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](18, 13);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](19, TournamentEditorComponent_th_19_Template, 2, 0, "th", 11)(20, TournamentEditorComponent_td_20_Template, 3, 5, "td", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](21, 14);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](22, TournamentEditorComponent_th_22_Template, 2, 0, "th", 11)(23, TournamentEditorComponent_td_23_Template, 3, 5, "td", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](24, 15);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](25, TournamentEditorComponent_th_25_Template, 2, 0, "th", 11)(26, TournamentEditorComponent_td_26_Template, 3, 5, "td", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](27, 16);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](28, TournamentEditorComponent_th_28_Template, 2, 0, "th", 11)(29, TournamentEditorComponent_td_29_Template, 3, 5, "td", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](30, 17);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](31, TournamentEditorComponent_th_31_Template, 2, 0, "th", 11)(32, TournamentEditorComponent_td_32_Template, 3, 5, "td", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](33, 18);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](34, TournamentEditorComponent_th_34_Template, 2, 0, "th", 11)(35, TournamentEditorComponent_td_35_Template, 3, 5, "td", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](36, 19);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](37, TournamentEditorComponent_th_37_Template, 2, 0, "th", 11)(38, TournamentEditorComponent_td_38_Template, 3, 5, "td", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](39, 20);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](40, TournamentEditorComponent_th_40_Template, 2, 0, "th", 11)(41, TournamentEditorComponent_td_41_Template, 2, 1, "td", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](42, 21);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](43, TournamentEditorComponent_th_43_Template, 2, 0, "th", 11)(44, TournamentEditorComponent_td_44_Template, 2, 1, "td", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](45, TournamentEditorComponent_tr_45_Template, 1, 0, "tr", 22)(46, TournamentEditorComponent_tr_46_Template, 1, 0, "tr", 23);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        }
        if (rf & 2) {
          const tournamentForm_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](1);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("disabled", !tournamentForm_r25.form.valid);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx.getErrors(tournamentForm_r25.form));
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("dataSource", ctx.dataSource);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](37);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("matHeaderRowDef", ctx.displayedColumns);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("matRowDefColumns", ctx.displayedColumns);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.NgForOf, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NumberValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.RequiredValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NgModel, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NgForm, _angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterLink, _angular_material_sort__WEBPACK_IMPORTED_MODULE_0__.MatSort, _angular_material_sort__WEBPACK_IMPORTED_MODULE_0__.MatSortHeader, _angular_material_table__WEBPACK_IMPORTED_MODULE_1__.MatTable, _angular_material_table__WEBPACK_IMPORTED_MODULE_1__.MatHeaderCellDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_1__.MatHeaderRowDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_1__.MatColumnDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_1__.MatCellDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_1__.MatRowDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_1__.MatHeaderCell, _angular_material_table__WEBPACK_IMPORTED_MODULE_1__.MatCell, _angular_material_table__WEBPACK_IMPORTED_MODULE_1__.MatHeaderRow, _angular_material_table__WEBPACK_IMPORTED_MODULE_1__.MatRow, _bowler_exists_validator_directive__WEBPACK_IMPORTED_MODULE_8__.BowlerExistsValidatorDirective, _pipes_append_values_pipe__WEBPACK_IMPORTED_MODULE_9__.AppendValuesPipe],
      styles: ["table[_ngcontent-%COMP%] {\n    width: 100%;\n    margin-bottom: 1em;\n}\n\nth[_ngcontent-%COMP%], td[_ngcontent-%COMP%] {\n    text-align: right;\n}\n\n.mat-column-Bowler[_ngcontent-%COMP%] {\n    text-align: left;\n}\n\n.mdc-data-table__row[_ngcontent-%COMP%] {\n    height: 40px;\n}\n\ninput[_ngcontent-%COMP%] {\n    border: none;\n    width: 100%;\n    min-width: 50px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29tcG9uZW50cy90b3VybmFtZW50LWVkaXRvci90b3VybmFtZW50LWVkaXRvci5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksV0FBVztJQUNYLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLGlCQUFpQjtBQUNyQjs7QUFFQTtJQUNJLGdCQUFnQjtBQUNwQjs7QUFFQTtJQUNJLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSxZQUFZO0lBQ1osV0FBVztJQUNYLGVBQWU7QUFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJ0YWJsZSB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgbWFyZ2luLWJvdHRvbTogMWVtO1xufVxuXG50aCwgdGQge1xuICAgIHRleHQtYWxpZ246IHJpZ2h0O1xufVxuXG4ubWF0LWNvbHVtbi1Cb3dsZXIge1xuICAgIHRleHQtYWxpZ246IGxlZnQ7XG59XG5cbi5tZGMtZGF0YS10YWJsZV9fcm93IHtcbiAgICBoZWlnaHQ6IDQwcHg7XG59XG5cbmlucHV0IHtcbiAgICBib3JkZXI6IG5vbmU7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgbWluLXdpZHRoOiA1MHB4O1xufSJdLCJzb3VyY2VSb290IjoiIn0= */"]
    });
  }
}

/***/ }),

/***/ 5358:
/*!***************************************************!*\
  !*** ./node_modules/moment/locale/ sync ^\.\/.*$ ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./af": 5637,
	"./af.js": 5637,
	"./ar": 6777,
	"./ar-dz": 4508,
	"./ar-dz.js": 4508,
	"./ar-kw": 7504,
	"./ar-kw.js": 7504,
	"./ar-ly": 5373,
	"./ar-ly.js": 5373,
	"./ar-ma": 2412,
	"./ar-ma.js": 2412,
	"./ar-ps": 8823,
	"./ar-ps.js": 8823,
	"./ar-sa": 6670,
	"./ar-sa.js": 6670,
	"./ar-tn": 6448,
	"./ar-tn.js": 6448,
	"./ar.js": 6777,
	"./az": 3009,
	"./az.js": 3009,
	"./be": 8299,
	"./be.js": 8299,
	"./bg": 4685,
	"./bg.js": 4685,
	"./bm": 1171,
	"./bm.js": 1171,
	"./bn": 3590,
	"./bn-bd": 5841,
	"./bn-bd.js": 5841,
	"./bn.js": 3590,
	"./bo": 4309,
	"./bo.js": 4309,
	"./br": 4130,
	"./br.js": 4130,
	"./bs": 8033,
	"./bs.js": 8033,
	"./ca": 5294,
	"./ca.js": 5294,
	"./cs": 3028,
	"./cs.js": 3028,
	"./cv": 5807,
	"./cv.js": 5807,
	"./cy": 342,
	"./cy.js": 342,
	"./da": 8269,
	"./da.js": 8269,
	"./de": 1489,
	"./de-at": 2123,
	"./de-at.js": 2123,
	"./de-ch": 7757,
	"./de-ch.js": 7757,
	"./de.js": 1489,
	"./dv": 8152,
	"./dv.js": 8152,
	"./el": 7687,
	"./el.js": 7687,
	"./en-au": 6668,
	"./en-au.js": 6668,
	"./en-ca": 6798,
	"./en-ca.js": 6798,
	"./en-gb": 3615,
	"./en-gb.js": 3615,
	"./en-ie": 1364,
	"./en-ie.js": 1364,
	"./en-il": 9907,
	"./en-il.js": 9907,
	"./en-in": 533,
	"./en-in.js": 533,
	"./en-nz": 3190,
	"./en-nz.js": 3190,
	"./en-sg": 1096,
	"./en-sg.js": 1096,
	"./eo": 3962,
	"./eo.js": 3962,
	"./es": 7726,
	"./es-do": 5010,
	"./es-do.js": 5010,
	"./es-mx": 3654,
	"./es-mx.js": 3654,
	"./es-us": 9043,
	"./es-us.js": 9043,
	"./es.js": 7726,
	"./et": 5343,
	"./et.js": 5343,
	"./eu": 728,
	"./eu.js": 728,
	"./fa": 787,
	"./fa.js": 787,
	"./fi": 1771,
	"./fi.js": 1771,
	"./fil": 5335,
	"./fil.js": 5335,
	"./fo": 9761,
	"./fo.js": 9761,
	"./fr": 1670,
	"./fr-ca": 8991,
	"./fr-ca.js": 8991,
	"./fr-ch": 7280,
	"./fr-ch.js": 7280,
	"./fr.js": 1670,
	"./fy": 4203,
	"./fy.js": 4203,
	"./ga": 9858,
	"./ga.js": 9858,
	"./gd": 8605,
	"./gd.js": 8605,
	"./gl": 7365,
	"./gl.js": 7365,
	"./gom-deva": 3896,
	"./gom-deva.js": 3896,
	"./gom-latn": 5587,
	"./gom-latn.js": 5587,
	"./gu": 7950,
	"./gu.js": 7950,
	"./he": 2029,
	"./he.js": 2029,
	"./hi": 1897,
	"./hi.js": 1897,
	"./hr": 9816,
	"./hr.js": 9816,
	"./hu": 2253,
	"./hu.js": 2253,
	"./hy-am": 8196,
	"./hy-am.js": 8196,
	"./id": 1307,
	"./id.js": 1307,
	"./is": 5474,
	"./is.js": 5474,
	"./it": 3099,
	"./it-ch": 8188,
	"./it-ch.js": 8188,
	"./it.js": 3099,
	"./ja": 9127,
	"./ja.js": 9127,
	"./jv": 182,
	"./jv.js": 182,
	"./ka": 758,
	"./ka.js": 758,
	"./kk": 3444,
	"./kk.js": 3444,
	"./km": 2034,
	"./km.js": 2034,
	"./kn": 6223,
	"./kn.js": 6223,
	"./ko": 3064,
	"./ko.js": 3064,
	"./ku": 8714,
	"./ku-kmr": 961,
	"./ku-kmr.js": 961,
	"./ku.js": 8714,
	"./ky": 2062,
	"./ky.js": 2062,
	"./lb": 4796,
	"./lb.js": 4796,
	"./lo": 9279,
	"./lo.js": 9279,
	"./lt": 106,
	"./lt.js": 106,
	"./lv": 1840,
	"./lv.js": 1840,
	"./me": 2240,
	"./me.js": 2240,
	"./mi": 3588,
	"./mi.js": 3588,
	"./mk": 5518,
	"./mk.js": 5518,
	"./ml": 7823,
	"./ml.js": 7823,
	"./mn": 8657,
	"./mn.js": 8657,
	"./mr": 1285,
	"./mr.js": 1285,
	"./ms": 3014,
	"./ms-my": 6253,
	"./ms-my.js": 6253,
	"./ms.js": 3014,
	"./mt": 167,
	"./mt.js": 167,
	"./my": 7940,
	"./my.js": 7940,
	"./nb": 14,
	"./nb.js": 14,
	"./ne": 9023,
	"./ne.js": 9023,
	"./nl": 4208,
	"./nl-be": 1412,
	"./nl-be.js": 1412,
	"./nl.js": 4208,
	"./nn": 1354,
	"./nn.js": 1354,
	"./oc-lnc": 870,
	"./oc-lnc.js": 870,
	"./pa-in": 389,
	"./pa-in.js": 389,
	"./pl": 7342,
	"./pl.js": 7342,
	"./pt": 4774,
	"./pt-br": 3003,
	"./pt-br.js": 3003,
	"./pt.js": 4774,
	"./ro": 5333,
	"./ro.js": 5333,
	"./ru": 3451,
	"./ru.js": 3451,
	"./sd": 3921,
	"./sd.js": 3921,
	"./se": 9682,
	"./se.js": 9682,
	"./si": 582,
	"./si.js": 582,
	"./sk": 4348,
	"./sk.js": 4348,
	"./sl": 5337,
	"./sl.js": 5337,
	"./sq": 9358,
	"./sq.js": 9358,
	"./sr": 683,
	"./sr-cyrl": 9382,
	"./sr-cyrl.js": 9382,
	"./sr.js": 683,
	"./ss": 1156,
	"./ss.js": 1156,
	"./sv": 9855,
	"./sv.js": 9855,
	"./sw": 8536,
	"./sw.js": 8536,
	"./ta": 7754,
	"./ta.js": 7754,
	"./te": 7809,
	"./te.js": 7809,
	"./tet": 1297,
	"./tet.js": 1297,
	"./tg": 2527,
	"./tg.js": 2527,
	"./th": 5862,
	"./th.js": 5862,
	"./tk": 9331,
	"./tk.js": 9331,
	"./tl-ph": 4387,
	"./tl-ph.js": 4387,
	"./tlh": 3592,
	"./tlh.js": 3592,
	"./tr": 9732,
	"./tr.js": 9732,
	"./tzl": 9570,
	"./tzl.js": 9570,
	"./tzm": 3553,
	"./tzm-latn": 7699,
	"./tzm-latn.js": 7699,
	"./tzm.js": 3553,
	"./ug-cn": 5674,
	"./ug-cn.js": 5674,
	"./uk": 9974,
	"./uk.js": 9974,
	"./ur": 5773,
	"./ur.js": 5773,
	"./uz": 357,
	"./uz-latn": 7135,
	"./uz-latn.js": 7135,
	"./uz.js": 357,
	"./vi": 43,
	"./vi.js": 43,
	"./x-pseudo": 767,
	"./x-pseudo.js": 767,
	"./yo": 150,
	"./yo.js": 150,
	"./zh-cn": 1828,
	"./zh-cn.js": 1828,
	"./zh-hk": 6644,
	"./zh-hk.js": 6644,
	"./zh-mo": 9305,
	"./zh-mo.js": 9305,
	"./zh-tw": 1860,
	"./zh-tw.js": 1860
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 5358;

/***/ }),

/***/ 5473:
/*!*******************************************************!*\
  !*** ./src/app/components/footer/footer.component.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FooterComponent: () => (/* binding */ FooterComponent)
/* harmony export */ });
/* harmony import */ var _services_permission_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @services/permission.service */ 154);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2481);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 3683);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 4487);





function FooterComponent_a_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "a", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Content Blocks");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
class FooterComponent {
  constructor(permissions) {
    this.permissions = permissions;
    this.canViewContentBlocks = false;
  }
  ngOnInit() {
    //TODO: CHAD: can probably move to auth route guard somehow with the permissions???
    this.permissions.checkPermission(_services_permission_service__WEBPACK_IMPORTED_MODULE_0__.PERMISSION.READ_SITEMAP).subscribe(canEdit => {
      this.canViewContentBlocks = canEdit;
    });
  }
  static {
    this.ɵfac = function FooterComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || FooterComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_permission_service__WEBPACK_IMPORTED_MODULE_0__.PermissionService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
      type: FooterComponent,
      selectors: [["app-footer"]],
      standalone: false,
      decls: 2,
      vars: 1,
      consts: [[1, "bg-light", "p-1", "text-center"], ["routerLink", "/contentblocks", 4, "ngIf"], ["routerLink", "/contentblocks"]],
      template: function FooterComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "footer", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, FooterComponent_a_1_Template, 2, 0, "a", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.canViewContentBlocks);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf, _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterLink],
      styles: ["footer[_ngcontent-%COMP%] {\n    min-height: 50px !important;\n    height: 50px !important;\n    position:fixed;\n    bottom:0px;\n    width:100%;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29tcG9uZW50cy9mb290ZXIvZm9vdGVyLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSwyQkFBMkI7SUFDM0IsdUJBQXVCO0lBQ3ZCLGNBQWM7SUFDZCxVQUFVO0lBQ1YsVUFBVTtBQUNkIiwic291cmNlc0NvbnRlbnQiOlsiZm9vdGVyIHtcbiAgICBtaW4taGVpZ2h0OiA1MHB4ICFpbXBvcnRhbnQ7XG4gICAgaGVpZ2h0OiA1MHB4ICFpbXBvcnRhbnQ7XG4gICAgcG9zaXRpb246Zml4ZWQ7XG4gICAgYm90dG9tOjBweDtcbiAgICB3aWR0aDoxMDAlO1xufSJdLCJzb3VyY2VSb290IjoiIn0= */"]
    });
  }
}

/***/ }),

/***/ 6379:
/*!************************************************************!*\
  !*** ./src/app/pages/bowler-page/bowler-page.component.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BowlerPageComponent: () => (/* binding */ BowlerPageComponent)
/* harmony export */ });
/* harmony import */ var _models_BowlerRecord__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @models/BowlerRecord */ 547);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2481);
/* harmony import */ var _services_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @services/api.service */ 3366);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 5422);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/card */ 3777);





class BowlerPageComponent {
  constructor(api) {
    this.api = api;
  }
  ngOnInit() {
    this.api.bowlers$().subscribe(bowlers => {
      this.data = bowlers.filter(x => x.ID == this.bowler)?.[0] || new _models_BowlerRecord__WEBPACK_IMPORTED_MODULE_0__.BowlerRecord();
    });
  }
  static {
    this.ɵfac = function BowlerPageComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || BowlerPageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_api_service__WEBPACK_IMPORTED_MODULE_2__.ApiService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
      type: BowlerPageComponent,
      selectors: [["app-bowler-page"]],
      inputs: {
        bowler: "bowler"
      },
      standalone: false,
      decls: 7,
      vars: 1,
      consts: [["id", "card"], ["name", "stats"], ["name", "results"]],
      template: function BowlerPageComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-card", 0)(1, "mat-card-header")(2, "h1");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "mat-card-content");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](5, "router-outlet", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](6, "router-outlet", 2);
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.data == null ? null : ctx.data.Name);
        }
      },
      dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterOutlet, _angular_material_card__WEBPACK_IMPORTED_MODULE_4__.MatCard, _angular_material_card__WEBPACK_IMPORTED_MODULE_4__.MatCardContent, _angular_material_card__WEBPACK_IMPORTED_MODULE_4__.MatCardHeader],
      styles: ["#card[_ngcontent-%COMP%] {\n    margin:1em;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvcGFnZXMvYm93bGVyLXBhZ2UvYm93bGVyLXBhZ2UuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLFVBQVU7QUFDZCIsInNvdXJjZXNDb250ZW50IjpbIiNjYXJkIHtcbiAgICBtYXJnaW46MWVtO1xufSJdLCJzb3VyY2VSb290IjoiIn0= */"]
    });
  }
}

/***/ }),

/***/ 6437:
/*!*******************************************************************!*\
  !*** ./src/app/components/bowler-stats/bowler-stats.component.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BowlerStatsComponent: () => (/* binding */ BowlerStatsComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 2481);
/* harmony import */ var _services_api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @services/api.service */ 3366);


class BowlerStatsComponent {
  constructor(api) {
    this.api = api;
    this.stats = {
      playingAverage: 0,
      careerAverage: 0,
      wins: 0,
      highGame: 0,
      highSet: 0,
      tournaments: 0,
      games: 0,
      totalPinfall: 0,
      careerAverageTeaching: 0,
      careerAverageTournament: 0,
      careerAverageSeniors: 0
    };
    // TODO: CHAD: This needs to be shared, but also, use actual seasons, not just this bowlers
    this.limitSeasons = (results, seasonsToKeep) => {
      const seasonOrder = Array.from(new Set(results.map(r => r.SeasonCode))).sort((a, b) => b - a);
      const allowed = new Set(seasonOrder.slice(0, seasonsToKeep));
      return results.filter(r => allowed.has(r.SeasonCode));
    };
    this.takeLatestTournaments = (results, tournamentsNeeded) => {
      const slice = results.slice(0, tournamentsNeeded);
      const pinfall = slice.reduce((sum, res) => sum + [res.Game1, res.Game2, res.Game3, res.Game4, res.Game5, res.Game6, res.Game7, res.Game8].filter(g => g && g > 0).reduce((a, b) => a + b, 0), 0);
      const gamesCount = slice.reduce((sum, res) => sum + [res.Game1, res.Game2, res.Game3, res.Game4, res.Game5, res.Game6, res.Game7, res.Game8].filter(g => g && g > 0).length, 0);
      return {
        tournamentsCount: slice.length,
        gamesCount,
        pinfall
      };
    };
    this.countGames = results => {
      return results.map(x => (!!x.Game1 ? 1 : 0) + (!!x.Game2 ? 1 : 0) + (!!x.Game3 ? 1 : 0) + (!!x.Game4 ? 1 : 0) + (!!x.Game5 ? 1 : 0) + (!!x.Game6 ? 1 : 0) + (!!x.Game7 ? 1 : 0) + (!!x.Game8 ? 1 : 0)).reduce((a, b) => a + b, 0);
    };
    this.sumGames = results => {
      return results.map(x => x.Game1 + x.Game2 + x.Game3 + x.Game4 + x.Game5 + x.Game6 + x.Game7 + x.Game8).reduce((a, b) => a + b, 0);
    };
  }
  ngOnInit() {
    this.api.bowlerResults$(this.bowler).subscribe(data => {
      const results = data.sort((a, b) => b.date().valueOf() - a.date().valueOf());
      this.stats.tournaments = results.length;
      this.stats.highSet = results.map(x => x.Game1 + x.Game2 + x.Game3 + x.Game4 + x.Game5 + x.Game6 + x.Game7 + x.Game8).reduce((a, b) => Math.max(a, b), 0);
      this.stats.highGame = results.map(x => Math.max(x.Game1, x.Game2, x.Game3, x.Game4, x.Game5, x.Game6, x.Game7, x.Game8)).reduce((a, b) => Math.max(a, b), 0);
      this.stats.games = this.countGames(results);
      this.stats.totalPinfall = this.sumGames(results);
      this.stats.careerAverage = Math.trunc(this.stats.totalPinfall / this.stats.games);
      // Masters Average: last 10 tournaments, current season + previous 4 seasons, ignoring flagged tournaments
      const filtered = this.limitSeasons(results, 5).filter(r => !r.IgnoreForAverage);
      const {
        tournamentsCount,
        gamesCount,
        pinfall
      } = this.takeLatestTournaments(filtered, 10);
      this.stats.playingAverage = tournamentsCount === 10 ? Math.trunc(pinfall / gamesCount) : null;
      //TODO: CHAD: Wins
    });
  }
  static {
    this.ɵfac = function BowlerStatsComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || BowlerStatsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_api_service__WEBPACK_IMPORTED_MODULE_1__.ApiService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: BowlerStatsComponent,
      selectors: [["app-bowler-stats"]],
      inputs: {
        bowler: "bowler"
      },
      standalone: false,
      decls: 39,
      vars: 7,
      consts: [[2, "text-align", "right"], [1, "note"]],
      template: function BowlerStatsComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "table")(1, "tr")(2, "td");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Masters Average");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "td", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "td");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Career Average");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "td", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "tr")(11, "td");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, "Wins/Stars");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "td", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "? ");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "td");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "Career Total");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "td", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "tr")(20, "td");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, "High Game");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "td", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "td");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](25, "Career Tournaments");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "td", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "tr")(29, "td");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](30, "High Set");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "td", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](32);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "td");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](34, "Career Games");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "td", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](36);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "div", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](38, "* since 2015");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.stats.playingAverage);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.stats.careerAverage);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](9);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.stats.totalPinfall);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.stats.highGame);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.stats.tournaments);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.stats.highSet);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.stats.games);
        }
      },
      styles: ["table[_ngcontent-%COMP%] {\n    width: 100%;\n}\n\ntd[_ngcontent-%COMP%] {\n    padding-left: 3em;\n    padding-right: 3em;\n}\n\n.note[_ngcontent-%COMP%] {\n    font-style: italic;\n    font-size:smaller;\n    width: 100%;\n    text-align: right;\n    padding-right: 3em;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29tcG9uZW50cy9ib3dsZXItc3RhdHMvYm93bGVyLXN0YXRzLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxXQUFXO0FBQ2Y7O0FBRUE7SUFDSSxpQkFBaUI7SUFDakIsa0JBQWtCO0FBQ3RCOztBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLGlCQUFpQjtJQUNqQixXQUFXO0lBQ1gsaUJBQWlCO0lBQ2pCLGtCQUFrQjtBQUN0QiIsInNvdXJjZXNDb250ZW50IjpbInRhYmxlIHtcbiAgICB3aWR0aDogMTAwJTtcbn1cblxudGQge1xuICAgIHBhZGRpbmctbGVmdDogM2VtO1xuICAgIHBhZGRpbmctcmlnaHQ6IDNlbTtcbn1cblxuLm5vdGUge1xuICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcbiAgICBmb250LXNpemU6c21hbGxlcjtcbiAgICB3aWR0aDogMTAwJTtcbiAgICB0ZXh0LWFsaWduOiByaWdodDtcbiAgICBwYWRkaW5nLXJpZ2h0OiAzZW07XG59Il0sInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ }),

/***/ 6447:
/*!***********************************************!*\
  !*** ./src/app/models/SeasonSummaryRecord.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SeasonSummaryRecord: () => (/* binding */ SeasonSummaryRecord)
/* harmony export */ });
class SeasonSummaryRecord {
  ensureTypes() {
    const orUndefined = x => Number.isNaN(Number.parseInt(`${x}`)) ? undefined : 1 * x;
    this.Scratch1 = orUndefined(this.Scratch1);
    this.Scratch2 = orUndefined(this.Scratch2);
    this.Scratch3 = orUndefined(this.Scratch3);
    this.Scratch4 = orUndefined(this.Scratch4);
    this.Scratch5 = orUndefined(this.Scratch5);
    this.Scratch6 = orUndefined(this.Scratch6);
    this.POA1 = orUndefined(this.POA1);
    this.POA2 = orUndefined(this.POA2);
    this.POA3 = orUndefined(this.POA3);
    this.POA4 = orUndefined(this.POA4);
    this.POA5 = orUndefined(this.POA5);
    this.POA6 = orUndefined(this.POA6);
    return this;
  }
  scratchArray() {
    return [this.Scratch1, this.Scratch2, this.Scratch3, this.Scratch4, this.Scratch5, this.Scratch6].filter(x => x != undefined).sort((x, y) => y - x);
  }
  poaArray() {
    return [this.POA1, this.POA2, this.POA3, this.POA4, this.POA5, this.POA6].filter(x => x != undefined).sort((x, y) => y - x);
  }
  topNScratch(n) {
    return this.scratchArray().slice(0, Math.min(n, this.scratchArray().length)).reduce((x, y) => x + y, 0);
  }
  topNPoa(n) {
    return this.poaArray().slice(0, Math.min(n, this.poaArray().length)).reduce((x, y) => x + y, 0);
  }
}

/***/ }),

/***/ 6699:
/*!**********************************************************************************!*\
  !*** ./src/app/pages/tournament-upload-page/tournament-upload-page.component.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TournamentUploadPageComponent: () => (/* binding */ TournamentUploadPageComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 2481);
/* harmony import */ var _components_upload_tournament_upload_tournament_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/upload-tournament/upload-tournament.component */ 4769);
/* harmony import */ var _components_tournament_editor_tournament_editor_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/tournament-editor/tournament-editor.component */ 5313);



class TournamentUploadPageComponent {
  constructor() {
    this.tournamentResults = [];
  }
  ngOnInit() {}
  tournamentUploaded(tournamentResults) {
    this.tournamentResults = [...tournamentResults];
  }
  static {
    this.ɵfac = function TournamentUploadPageComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || TournamentUploadPageComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: TournamentUploadPageComponent,
      selectors: [["app-tournament-upload-page"]],
      inputs: {
        tournament: "tournament"
      },
      standalone: false,
      decls: 2,
      vars: 2,
      consts: [[3, "tournamentUploadedEvent"], [3, "results", "tournament"]],
      template: function TournamentUploadPageComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "app-upload-tournament", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("tournamentUploadedEvent", function TournamentUploadPageComponent_Template_app_upload_tournament_tournamentUploadedEvent_0_listener($event) {
            return ctx.tournamentUploaded($event);
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "app-tournament-editor", 1);
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("results", ctx.tournamentResults)("tournament", ctx.tournament);
        }
      },
      dependencies: [_components_upload_tournament_upload_tournament_component__WEBPACK_IMPORTED_MODULE_1__.UploadTournamentComponent, _components_tournament_editor_tournament_editor_component__WEBPACK_IMPORTED_MODULE_2__.TournamentEditorComponent],
      styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ }),

/***/ 7274:
/*!********************************!*\
  !*** ./auth_config.local.json ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"domain":"manitobamasterbowlers.us.auth0.com","clientId":"X62gUUDb8PcXtcoltVkOItrnefL6DLtC","authorizationParams":{"audience":"https://manitobamastersfunc.azurewebsites.net/"},"apiUri":"http://localhost:7071/api/","appUri":"http://localhost:4200","errorPath":"/error"}');

/***/ }),

/***/ 7287:
/*!*********************************************!*\
  !*** ./src/app/pipes/append-values.pipe.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppendValuesPipe: () => (/* binding */ AppendValuesPipe)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 2481);

class AppendValuesPipe {
  transform(...args) {
    return args.join('_');
  }
  static {
    this.ɵfac = function AppendValuesPipe_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || AppendValuesPipe)();
    };
  }
  static {
    this.ɵpipe = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefinePipe"]({
      name: "appendValues",
      type: AppendValuesPipe,
      pure: true,
      standalone: false
    });
  }
}

/***/ }),

/***/ 8325:
/*!*********************************************************!*\
  !*** ./src/app/components/loading/loading.component.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LoadingComponent: () => (/* binding */ LoadingComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 2481);

class LoadingComponent {
  constructor() {}
  ngOnInit() {}
  static {
    this.ɵfac = function LoadingComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || LoadingComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: LoadingComponent,
      selectors: [["app-loading"]],
      standalone: false,
      decls: 2,
      vars: 0,
      consts: [[1, "loading"], ["src", "assets/loading.svg", "alt", "Loading..."]],
      template: function LoadingComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "img", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }
      },
      styles: [".loading[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 500px;\n  align-items: center;\n  justify-content: center;\n}\n\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvY29tcG9uZW50cy9sb2FkaW5nL2xvYWRpbmcuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGFBQWE7RUFDYixpQkFBaUI7RUFDakIsbUJBQW1CO0VBQ25CLHVCQUF1QjtBQUN6QiIsInNvdXJjZXNDb250ZW50IjpbIi5sb2FkaW5nIHtcbiAgZGlzcGxheTogZmxleDtcbiAgbWluLWhlaWdodDogNTAwcHg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ }),

/***/ 8561:
/*!****************************************!*\
  !*** ./src/app/utils/export-to-csv.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   exportToCsv: () => (/* binding */ exportToCsv)
/* harmony export */ });
function exportToCsv(filename, columns, rows) {
  if (!rows?.length || !columns?.length) {
    return;
  }
  const header = columns.join(',');
  const body = rows.map(row => columns.map(col => {
    const value = row?.[col];
    // JSON.stringify handles quoting/escaping and preserves commas/newlines safely.
    return JSON.stringify(value ?? '');
  }).join(','));
  const csv = [header, ...body].join('\r\n');
  const blob = new Blob([csv], {
    type: 'text/csv;charset=utf-8;'
  });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}

/***/ }),

/***/ 8893:
/*!******************************************************************************!*\
  !*** ./src/app/pages/tournament-edit-page/tournament-edit-page.component.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TournamentEditPageComponent: () => (/* binding */ TournamentEditPageComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 2481);
/* harmony import */ var _services_api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @services/api.service */ 3366);
/* harmony import */ var _components_tournament_editor_tournament_editor_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/tournament-editor/tournament-editor.component */ 5313);



class TournamentEditPageComponent {
  constructor(api) {
    this.api = api;
    this.tournamentResults = [];
  }
  ngOnChanges(_changes) {
    this.api.tournamentResults$(this.tournament).subscribe(results => {
      this.tournamentResults = results;
    });
  }
  static {
    this.ɵfac = function TournamentEditPageComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || TournamentEditPageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_api_service__WEBPACK_IMPORTED_MODULE_1__.ApiService));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: TournamentEditPageComponent,
      selectors: [["app-tournament-edit-page"]],
      inputs: {
        tournament: "tournament"
      },
      standalone: false,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]],
      decls: 1,
      vars: 2,
      consts: [[3, "results", "tournament"]],
      template: function TournamentEditPageComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-tournament-editor", 0);
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("results", ctx.tournamentResults)("tournament", ctx.tournament);
        }
      },
      dependencies: [_components_tournament_editor_tournament_editor_component__WEBPACK_IMPORTED_MODULE_2__.TournamentEditorComponent],
      styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ }),

/***/ 8939:
/*!************************************************!*\
  !*** ./src/app/pages/error/error.component.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ErrorComponent: () => (/* binding */ ErrorComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 4876);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 3900);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2481);
/* harmony import */ var _auth0_auth0_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @auth0/auth0-angular */ 7989);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 5422);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 3683);






function ErrorComponent_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "h1");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "An error was returned from Auth0");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4, "Something went wrong when trying to authorize your application. Please inspect the error below and ensure the appropriate auth config (local or prod) is configured correctly.");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const error_r1 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", error_r1.error_description, " ");
  }
}
class ErrorComponent {
  constructor(auth, router) {
    this.auth = auth;
    this.router = router;
    this.error$ = this.auth.error$;
  }
  ngOnInit() {
    (0,rxjs__WEBPACK_IMPORTED_MODULE_0__.timer)(0).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.takeUntil)(this.error$)).subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }
  static {
    this.ɵfac = function ErrorComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || ErrorComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_auth0_auth0_angular__WEBPACK_IMPORTED_MODULE_3__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
      type: ErrorComponent,
      selectors: [["app-error"]],
      standalone: false,
      decls: 3,
      vars: 3,
      consts: [[1, "container", "mt-5"], [4, "ngIf"], ["role", "alert", 1, "alert", "alert-danger"]],
      template: function ErrorComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, ErrorComponent_ng_container_1_Template, 7, 1, "ng-container", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](2, "async");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](2, 1, ctx.error$));
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_5__.AsyncPipe],
      encapsulation: 2
    });
  }
}

/***/ }),

/***/ 9093:
/*!************************************************!*\
  !*** ./src/app/services/tournament.service.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TournamentService: () => (/* binding */ TournamentService)
/* harmony export */ });
/* harmony import */ var _models_TournamentUploadRecord__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @models/TournamentUploadRecord */ 3342);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 4205);


class TournamentService {
  constructor() {}
  parseUpload(tsv) {
    let lines = tsv.split(/\r?\n/);
    return lines.map(line => /(?<Bowler>[a-zA-Z \-\.]+)\s+(?<Game1>\d{0,3})?\s*(?<Game2>\d{0,3})?\s*(?<Game3>\d{0,3})?\s*(?<Game4>\d{0,3})?\s*(?<Game5>\d{0,3})?\s*(?<Game6>\d{0,3})?\s*(?<Game7>\d{0,3})?\s*(?<Game8>\d{0,3})?\s*(?<Average>\d{0,3})?/.exec(line)).reduce((a, c) => a ? [...a, c.groups] : [c.groups], []).map(x => Object.assign(new _models_TournamentUploadRecord__WEBPACK_IMPORTED_MODULE_0__.TournamentUploadRecord(), x).ensureTypes());
  }
  static {
    this.ɵfac = function TournamentService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || TournamentService)();
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
      token: TournamentService,
      factory: TournamentService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ }),

/***/ 9762:
/*!**********************************************!*\
  !*** ./src/app/models/ContentBlockRecord.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ContentBlockRecord: () => (/* binding */ ContentBlockRecord)
/* harmony export */ });
class ContentBlockRecord {}

/***/ }),

/***/ 9775:
/*!***************************************************!*\
  !*** ./src/app/models/TournamentResultsRecord.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TournamentResultsRecord: () => (/* binding */ TournamentResultsRecord)
/* harmony export */ });
/* harmony import */ var _TournamentUploadRecord__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TournamentUploadRecord */ 3342);

class TournamentResultsRecord extends _TournamentUploadRecord__WEBPACK_IMPORTED_MODULE_0__.TournamentUploadRecord {
  ensureTypes() {
    super.ensureTypes();
    this.IgnoreForAverage = !!this.IgnoreForAverage;
    return this;
  }
}

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(4429)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map