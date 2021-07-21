var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import * as React from "react";
import List from "devextreme-react/list";
import DropDownBox from "devextreme-react/drop-down-box";
import { Popup, ToolbarItem } from 'devextreme-react/popup';
import { Column, DataGrid, Paging, Sorting } from "devextreme-react/data-grid";
import FileUploader from "devextreme-react/file-uploader";
import "../style/style-AAEList.css";
import "../style/media-queries.css";
//Класс, реализующий контрол «Административно-хозяйственные заявки»
var AAEList = /** @class */ (function (_super) {
    __extends(AAEList, _super);
    function AAEList(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            buildings: [], requests: [], inputText: "", selectedBuilding: { Id: "", Name: "", Rooms: [] },
            selectedCabinet: { Id: "", Name: "" }, dialogShow: false, isSent: false,
            dropDownBoxRefB: React.createRef(), dropDownBoxRefC: React.createRef(),
            fileUploaderRef: React.createRef(), file: null
        };
        //Привязка методов к контексту
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        return _this;
    }
    //Метод, делающий GET запрос на сервер для получения списка заявок
    AAEList.prototype.fetchRequests = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch(this.props.getUrlAAERequests)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        this.setState({ requests: data.AAERequests });
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    //Метод, делающий GET запрос на сервер для получения списка зданий
    AAEList.prototype.fetchBuildings = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch(this.props.getUrlBuildings)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        this.setState({ buildings: data.buildings });
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        console.log(error_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    //При монтировании компонента делаются два запроса для построенния dataGrid
    AAEList.prototype.componentDidMount = function () {
        this.fetchRequests();
        this.fetchBuildings();
    };
    //Обновляет компонент, если заявка успешно отправлена. Делается повторный запрос на список всех заявок
    AAEList.prototype.componentDidUpdate = function () {
        if (this.state.isSent) {
            this.fetchRequests();
            this.setState({ isSent: false });
        }
    };
    /*Отслеживание клика на кнопку отправить
    * Происходить POST запрос к серверу и отправка JSON строки
    * Если запрос успешно отправлен, то произойдет обновление таблицы и появится диалоговое окно*/
    AAEList.prototype.handleSubmit = function (e) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var formData;
            var _this = this;
            return __generator(this, function (_b) {
                e.preventDefault();
                formData = new FormData();
                formData.append("file", this.state.file);
                formData.append("AAERequest", JSON.stringify({
                    Text: this.state.inputText,
                    Building: this.state.selectedBuilding.Name,
                    Cabinet: this.state.selectedCabinet.Name,
                }));
                fetch(this.props.postUrlAAERequests, {
                    method: "POST",
                    body: formData
                })
                    .then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                    var data, error;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, response.json()];
                            case 1:
                                data = _a.sent();
                                if (!response.ok) {
                                    error = (data) || response.status;
                                    return [2 /*return*/, Promise.reject(error)];
                                }
                                else {
                                    this.setState({ isSent: true });
                                    this.setState({ dialogShow: true });
                                }
                                return [2 /*return*/];
                        }
                    });
                }); })
                    .catch(function (error) {
                    alert("Ошибка: " + error);
                    console.log(error);
                });
                this.setState({
                    inputText: "", file: null, selectedBuilding: { Id: "", Name: "", Rooms: [] },
                    selectedCabinet: { Id: "", Name: "" }
                });
                // Удаление загруженного файла со старницы
                (_a = this.state.fileUploaderRef.current) === null || _a === void 0 ? void 0 : _a.instance.reset();
                return [2 /*return*/];
            });
        });
    };
    AAEList.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "background" },
            React.createElement("h2", null, "\u0410\u0414\u041C\u0418\u041D\u0418\u0421\u0422\u0420\u0410\u0422\u0418\u0412\u041D\u041E-\u0425\u041E\u0417\u042F\u0419\u0421\u0422\u0412\u0415\u041D\u041D\u042B\u0415 \u0417\u0410\u042F\u0412\u041A\u0418"),
            React.createElement("div", { className: "container" },
                React.createElement("h3", null, "\u041C\u043E\u0438 \u0437\u0430\u044F\u0432\u043A\u0438 \u0432 \u0410\u0425\u041E"),
                React.createElement(DataGrid, { dataSource: this.state.requests, keyExpr: "id", showBorders: true, wordWrapEnabled: true, columnHidingEnabled: true, showRowLines: true, noDataText: "Нет заявок" },
                    React.createElement(Sorting, { mode: "single", ascendingText: "По возростанию", descendingText: "По убыванию", clearText: "Очистить" }),
                    React.createElement(Paging, { pageSize: 5 }),
                    React.createElement(Column, { dataField: "CreationDate", dataType: "date", format: "dd.MM.yyyy HH:mm", width: 175, caption: "СОЗДАНА", defaultSortOrder: "desc" }),
                    React.createElement(Column, { dataField: "Text", width: 750, caption: "ТЕКСТ", hidingPriority: 0 }),
                    React.createElement(Column, { dataField: "Building", width: 175, caption: "ЗДАНИЕ", hidingPriority: 2 }),
                    React.createElement(Column, { dataField: "Cabinet", width: 150, caption: "КАБИНЕТ", hidingPriority: 1 }),
                    React.createElement(Column, { dataField: "Status", caption: "СТАТУС" })),
                React.createElement("h3", null, "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0437\u0430\u044F\u0432\u043A\u0443"),
                React.createElement("form", { onSubmit: this.handleSubmit, action: this.props.postUrlAAERequests },
                    React.createElement("div", { className: "row" },
                        React.createElement("label", { className: "label" }, "\u0422\u0435\u043A\u0441\u0442 \u0437\u0430\u044F\u0432\u043A\u0438*"),
                        React.createElement("textarea", { className: "input-text", value: this.state.inputText, required: true, placeholder: "Введите текст заявки", onChange: function (e) {
                                _this.setState({ inputText: e.target.value });
                            } })),
                    React.createElement("div", { className: "row" },
                        React.createElement("label", { className: "label" }, "\u0417\u0434\u0430\u043D\u0438\u0435"),
                        React.createElement(DropDownBox, { dataSource: this.state.buildings, ref: this.state.dropDownBoxRefB, showClearButton: true, placeholder: "Оставить пустым", value: this.state.selectedBuilding.Name, onValueChanged: function (e) {
                                if (e.value === null)
                                    _this.setState({
                                        selectedBuilding: { Id: "", Name: "", Rooms: [] },
                                        selectedCabinet: { Id: "", Name: "" }
                                    });
                            } },
                            React.createElement(List, { dataSource: this.state.buildings, keyExpr: "Id", displayExpr: "Name", onItemClick: function (e) {
                                    var _a;
                                    _this.setState({
                                        selectedBuilding: e.itemData,
                                        selectedCabinet: { Id: "", Name: "" }
                                    });
                                    (_a = _this.state.dropDownBoxRefB.current) === null || _a === void 0 ? void 0 : _a.instance.close();
                                } }))),
                    React.createElement("div", { className: "row" },
                        React.createElement("label", { className: "label" }, "\u041A\u0430\u0431\u0438\u043D\u0435\u0442"),
                        React.createElement(DropDownBox, { dataSource: this.state.selectedBuilding.Rooms, ref: this.state.dropDownBoxRefC, placeholder: "Оставить пустым", showClearButton: true, value: this.state.selectedCabinet.Name, onValueChanged: function (e) {
                                if (e.value === null)
                                    _this.setState({ selectedCabinet: { Id: "", Name: "" } });
                            } },
                            React.createElement(List, { dataSource: this.state.selectedBuilding.Rooms, keyExpr: "Id", displayExpr: "Name", noDataText: "Нет доступных кабинетов", onItemClick: function (e) {
                                    var _a;
                                    _this.setState({ selectedCabinet: e.itemData });
                                    (_a = _this.state.dropDownBoxRefC.current) === null || _a === void 0 ? void 0 : _a.instance.close();
                                } }))),
                    React.createElement("div", { className: "row" },
                        React.createElement("label", { className: "label" },
                            "\u041F\u0440\u0438\u043A\u0440\u0435\u043F\u043B\u0435\u043D\u043D\u044B\u0439",
                            React.createElement("br", null),
                            "\u0444\u0430\u0439\u043B"),
                        React.createElement(FileUploader, { labelText: "", selectButtonText: "Обзор...", ref: this.state.fileUploaderRef, uploadMode: "useForm", name: "file", onValueChanged: function (e) {
                                _this.setState({ file: e.value[0] });
                            }, readyToUploadMessage: "Готово" })),
                    React.createElement("input", { type: "submit", className: "input-button" })),
                React.createElement(Popup, { title: "Ваша заявка успешно создана…", visible: this.state.dialogShow, width: "50%", height: "30%", showCloseButton: true, minHeight: 75, minWidth: 385, onHiding: function () { return _this.setState({ dialogShow: false }); }, closeOnOutsideClick: true, contentRender: function () { return React.createElement("p", { className: "popup-content" }, "\u0412\u0430\u0448\u0430 \u0437\u0430\u044F\u0432\u043A\u0430 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0441\u043E\u0437\u0434\u0430\u043D\u0430 \u0438 \u0432 \u0441\u043A\u043E\u0440\u043E\u043C \u0432\u0440\u0435\u043C\u0435\u043D\u0438 \u0431\u0443\u0434\u0435\u0442 \u0440\u0430\u0441\u0441\u043C\u043E\u0442\u0440\u0435\u043D\u0430 \u0434\u0438\u0441\u043F\u0435\u0442\u0447\u0435\u0440\u043E\u043C"); } },
                    React.createElement(ToolbarItem, { toolbar: "bottom", widget: "dxButton", location: "before", options: { text: "OK", onClick: function () { return _this.setState({ dialogShow: false }); } } })))));
    };
    return AAEList;
}(React.Component));
export default AAEList;
//# sourceMappingURL=AAEList.js.map