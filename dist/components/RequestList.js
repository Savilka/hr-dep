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
import { DataGrid, Column, Paging, Sorting } from 'devextreme-react/data-grid';
import Popup, { ToolbarItem } from "devextreme-react/popup";
import DropDownBox from "devextreme-react/drop-down-box";
import List from "devextreme-react/list";
import "../style/style-RequestList.css";
import { useEffect, useRef, useState } from "react";
//Функциональная компонента, реализующая контрол «Заявки в отдел кадров»
var RequestList = function (_a) {
    var getUrlRequests = _a.getUrlRequests, getUrlTypes = _a.getUrlTypes, postUrlRequests = _a.postUrlRequests;
    // requests - список заявок
    var _b = useState([]), requests = _b[0], setRequests = _b[1];
    // types - типы заявок
    var _c = useState([]), types = _c[0], setTypes = _c[1];
    // selectedType - тип заявки, выбранный в dropDownBox'е
    var _d = useState(""), selectedType = _d[0], setSelectedType = _d[1];
    // note - текст заметки
    var _e = useState(""), note = _e[0], setNote = _e[1];
    // isSent - флаг, показывающий успешно ли отправлена заявка
    var _f = useState(true), isSent = _f[0], setIsSent = _f[1];
    // dialogShow - флаг, отвечающий за открытие диалогового окна
    var _g = useState(false), dialogShow = _g[0], setDialogShow = _g[1];
    // dropDownBoxRef - ссылка на объект DropDownBox
    var dropDownBoxRef = useRef(null);
    useEffect(function () {
        // Функция, выполняющая GET запрос на сервер для получения списка типов заявок
        function fetchTypes() {
            return __awaiter(this, void 0, void 0, function () {
                var response, data, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            return [4 /*yield*/, fetch(getUrlTypes)];
                        case 1:
                            response = _a.sent();
                            return [4 /*yield*/, response.json()];
                        case 2:
                            data = _a.sent();
                            setTypes(data.types);
                            setSelectedType(data.types[0].ID);
                            return [3 /*break*/, 4];
                        case 3:
                            error_1 = _a.sent();
                            console.log(error_1);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        }
        fetchTypes();
    }, [getUrlTypes]);
    useEffect(function () {
        // Функция, выполняющая GET запрос на сервер для получения списка заявок
        function fetchRequests() {
            return __awaiter(this, void 0, void 0, function () {
                var response, data, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            return [4 /*yield*/, fetch(getUrlRequests)];
                        case 1:
                            response = _a.sent();
                            return [4 /*yield*/, response.json()];
                        case 2:
                            data = _a.sent();
                            setRequests(data.requests);
                            return [3 /*break*/, 4];
                        case 3:
                            error_2 = _a.sent();
                            console.log(error_2);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        }
        if (isSent)
            fetchRequests();
        setIsSent(false);
    }, [isSent, getUrlRequests]);
    /*Метод, возвращающий название заявки по её id, для dataGrid
      Также происходит проверка на undefined, чтобы метод find не выбросил исключение*/
    function calculateCellValue(id) {
        var _a, _b;
        return typeof ((_a = types.find(function (type) { return type.ID === id.TypeID; })) === null || _a === void 0 ? void 0 : _a.Name) === 'undefined' ? ""
            : (_b = types.find(function (type) { return type.ID === id.TypeID; })) === null || _b === void 0 ? void 0 : _b.Name;
    }
    /*Метод, возвращающий название заявки по её id, для dropDownBox
    * Также происходит проверка на undefined, чтобы метод find не выбросил исключение */
    function calculateDropDownBoxValue(id) {
        var _a, _b;
        return typeof ((_a = types.find(function (type) { return type.ID === id; })) === null || _a === void 0 ? void 0 : _a.Name) === 'undefined' ? ""
            : (_b = types.find(function (type) { return type.ID === id; })) === null || _b === void 0 ? void 0 : _b.Name;
    }
    /*Отслеживание клика на кнопку отправить
    * Выполняется POST запрос на серверу и отправка JSON строки
    * Если запрос успешно отправлен, то произойдет обновление таблицы и появится диалоговое окно*/
    function handleSubmit(e) {
        return __awaiter(this, void 0, void 0, function () {
            var requestOptions;
            var _this = this;
            return __generator(this, function (_a) {
                e.preventDefault();
                requestOptions = {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        TypeID: selectedType,
                        Note: note,
                    })
                };
                fetch(postUrlRequests, requestOptions)
                    .then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                    var isJson, data, _a, error;
                    var _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                isJson = (_b = response.headers.get('content-type')) === null || _b === void 0 ? void 0 : _b.includes('application/json');
                                _a = isJson;
                                if (!_a) return [3 /*break*/, 2];
                                return [4 /*yield*/, response.json()];
                            case 1:
                                _a = (_c.sent());
                                _c.label = 2;
                            case 2:
                                data = _a;
                                if (!response.ok) {
                                    error = (data && data.message) || response.status;
                                    return [2 /*return*/, Promise.reject(error)];
                                }
                                else {
                                    setIsSent(true);
                                    setDialogShow(true);
                                }
                                return [2 /*return*/];
                        }
                    });
                }); })
                    .catch(function (error) {
                    alert("Ошибка: " + error);
                    console.log(error);
                });
                setNote("");
                return [2 /*return*/];
            });
        });
    }
    return (React.createElement("div", { className: "container" },
        React.createElement("h3", { className: "title" }, "\u041C\u041E\u0418 \u0417\u0410\u042F\u0412\u041A\u0418 \u0412 \u041E\u0422\u0414\u0415\u041B \u041A\u0410\u0414\u0420\u041E\u0412"),
        React.createElement(DataGrid, { noDataText: "Нет заявок", dataSource: requests, keyExpr: "ID", showBorders: true, columnHidingEnabled: true },
            React.createElement(Sorting, { mode: "single", ascendingText: "По возростанию", descendingText: "По убыванию", clearText: "Очистить" }),
            React.createElement(Paging, { pageSize: 5 }),
            React.createElement(Column, { dataField: "CreationDate", dataType: "date", format: "dd.MM.yyyy HH:mm", caption: "СОЗДАНА", width: 175, hidingPriority: 3, defaultSortOrder: "desc" }),
            React.createElement(Column, { dataField: "TypeID", calculateCellValue: calculateCellValue, caption: "ТИП ЗАЯВКИ", width: 550, hidingPriority: 1 }),
            React.createElement(Column, { dataField: "Note", caption: "ПРИМЕЧАНИЕ", hidingPriority: 0, width: 550 }),
            React.createElement(Column, { dataField: "Status", caption: "СТАТУС", hidingPriority: 2 })),
        React.createElement("h3", { className: "title" }, "\u0421\u041E\u0417\u0414\u0410\u0422\u042C \u0417\u0410\u042F\u0412\u041A\u0423"),
        React.createElement("h4", { className: "mini-title" }, "\u0422\u0438\u043F \u0437\u0430\u044F\u0432\u043A\u0438"),
        React.createElement("form", { onSubmit: handleSubmit },
            React.createElement(DropDownBox, { dataSource: types, placeholder: "Выберите тип заявки", ref: dropDownBoxRef, value: calculateDropDownBoxValue(selectedType) },
                React.createElement(List, { dataSource: types, keyExpr: "ID", displayExpr: "Name", onItemClick: function (e) {
                        var _a;
                        setSelectedType(e.itemData.ID);
                        (_a = dropDownBoxRef.current) === null || _a === void 0 ? void 0 : _a.instance.close();
                    } })),
            React.createElement("h4", { className: "mini-title" }, "\u041F\u0440\u0438\u043C\u0435\u0447\u0430\u043D\u0438\u0435"),
            React.createElement("textarea", { className: "input-text", value: note, onChange: function (e) { return setNote(e.target.value); }, placeholder: "Введите комментарий, если требуется" }),
            React.createElement("br", null),
            React.createElement("input", { type: "submit", value: "ОТПРАВИТЬ", className: "input-button" })),
        React.createElement(Popup, { title: "Ваша заявка успешно создана…", visible: dialogShow, width: "50%", height: "30%", showCloseButton: true, minHeight: 75, minWidth: 385, onHiding: function () { return setDialogShow(false); }, closeOnOutsideClick: true, contentRender: function () { return React.createElement("p", { className: "popup-content" }, "\u0412\u0430\u0448\u0430 \u0437\u0430\u044F\u0432\u043A\u0430 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0441\u043E\u0437\u0434\u0430\u043D\u0430 \u0438 \u0432 \u0441\u043A\u043E\u0440\u043E\u043C \u0432\u0440\u0435\u043C\u0435\u043D\u0438 \u0431\u0443\u0434\u0435\u0442 \u0440\u0430\u0441\u0441\u043C\u043E\u0442\u0440\u0435\u043D\u0430 \u0434\u0438\u0441\u043F\u0435\u0442\u0447\u0435\u0440\u043E\u043C"); } },
            React.createElement(ToolbarItem, { toolbar: "bottom", widget: "dxButton", location: "before", options: { text: "OK", onClick: function () { return setDialogShow(false); } } }))));
};
export default RequestList;
//# sourceMappingURL=RequestList.js.map