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
import { useEffect, useRef, useState } from "react";
//Функциональная компонента, реализующая контрол «Административно-хозяйственные заявки»
var AAEList = function (_a) {
    var getUrlAAERequests = _a.getUrlAAERequests, getUrlBuildings = _a.getUrlBuildings, postUrlAAERequests = _a.postUrlAAERequests;
    // buildings - список зданий
    var _b = useState([]), buildings = _b[0], setBuildings = _b[1];
    // requests - список заявок
    var _c = useState([]), requests = _c[0], setRequests = _c[1];
    // inputText - текст заявки
    var _d = useState(""), inputText = _d[0], setInputText = _d[1];
    // selectedBuilding - выбранное здание
    var _e = useState({ Id: "", Name: "", Rooms: [] }), selectedBuilding = _e[0], setSelectedBuilding = _e[1];
    // selectedCabinet - выбранный кабинет
    var _f = useState({ Id: "", Name: "" }), selectedCabinet = _f[0], setSelectedCabinet = _f[1];
    // dialogShow - флаг, отвечающий за открытие диалогового окна
    var _g = useState(false), dialogShow = _g[0], setDialogShow = _g[1];
    // isSent - флаг, показывающий успешно ли отправлена заявка
    var _h = useState(true), isSent = _h[0], setIsSent = _h[1];
    // file - поле, хранящее отправляемый файл или null, если файла нет
    var _j = useState(null), file = _j[0], setFile = _j[1];
    // dropDownBoxRefB - ссылка на первый DropDownBox объект
    var dropDownBoxRefB = useRef(null);
    // dropDownBoxRefC - ссылка на второй DropDownBox объект
    var dropDownBoxRefC = useRef(null);
    // fileUploaderRef - ссылка на FileUploader объект
    var fileUploaderRef = useRef(null);
    useEffect(function () {
        function fetchBuildings() {
            return __awaiter(this, void 0, void 0, function () {
                var response, data, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            return [4 /*yield*/, fetch(getUrlBuildings)];
                        case 1:
                            response = _a.sent();
                            return [4 /*yield*/, response.json()];
                        case 2:
                            data = _a.sent();
                            setBuildings(data.buildings);
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
        fetchBuildings();
    }, [getUrlBuildings]);
    useEffect(function () {
        //Метод, выполняющий GET запрос на сервер для получения списка заявок
        function fetchRequests() {
            return __awaiter(this, void 0, void 0, function () {
                var response, data, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            return [4 /*yield*/, fetch(getUrlAAERequests)];
                        case 1:
                            response = _a.sent();
                            return [4 /*yield*/, response.json()];
                        case 2:
                            data = _a.sent();
                            setRequests(data.AAERequests);
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
    }, [isSent, getUrlAAERequests]);
    /*Отслеживание клика на кнопку "отправить"
    * Выполняется POST запрос на серверу и отправка JSON строки
    * Если запрос успешно отправлен, то произойдет обновление таблицы и появится диалоговое окно*/
    function handleSubmit(e) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var formData;
            var _this = this;
            return __generator(this, function (_b) {
                e.preventDefault();
                formData = new FormData();
                formData.append("file", file);
                formData.append("AAERequest", JSON.stringify({
                    Text: inputText,
                    Building: selectedBuilding.Name,
                    Cabinet: selectedCabinet.Name,
                }));
                fetch(postUrlAAERequests, {
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
                setInputText("");
                setSelectedBuilding({ Id: "", Name: "", Rooms: [] });
                setSelectedCabinet({ Id: "", Name: "" });
                // Удаление загруженного файла со страницы
                (_a = fileUploaderRef.current) === null || _a === void 0 ? void 0 : _a.instance.reset();
                return [2 /*return*/];
            });
        });
    }
    return (React.createElement("div", { className: "background" },
        React.createElement("h2", null, "\u0410\u0414\u041C\u0418\u041D\u0418\u0421\u0422\u0420\u0410\u0422\u0418\u0412\u041D\u041E-\u0425\u041E\u0417\u042F\u0419\u0421\u0422\u0412\u0415\u041D\u041D\u042B\u0415 \u0417\u0410\u042F\u0412\u041A\u0418"),
        React.createElement("div", { className: "container" },
            React.createElement("h3", null, "\u041C\u043E\u0438 \u0437\u0430\u044F\u0432\u043A\u0438 \u0432 \u0410\u0425\u041E"),
            React.createElement(DataGrid, { dataSource: requests, keyExpr: "id", showBorders: true, wordWrapEnabled: true, columnHidingEnabled: true, showRowLines: true, noDataText: "Нет заявок" },
                React.createElement(Sorting, { mode: "single", ascendingText: "По возростанию", descendingText: "По убыванию", clearText: "Очистить" }),
                React.createElement(Paging, { pageSize: 5 }),
                React.createElement(Column, { dataField: "CreationDate", dataType: "date", format: "dd.MM.yyyy HH:mm", width: 175, caption: "СОЗДАНА", defaultSortOrder: "desc" }),
                React.createElement(Column, { dataField: "Text", width: 750, caption: "ТЕКСТ", hidingPriority: 0 }),
                React.createElement(Column, { dataField: "Building", width: 175, caption: "ЗДАНИЕ", hidingPriority: 2 }),
                React.createElement(Column, { dataField: "Cabinet", width: 150, caption: "КАБИНЕТ", hidingPriority: 1 }),
                React.createElement(Column, { dataField: "Status", caption: "СТАТУС" })),
            React.createElement("h3", null, "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0437\u0430\u044F\u0432\u043A\u0443"),
            React.createElement("form", { onSubmit: handleSubmit },
                React.createElement("div", { className: "row" },
                    React.createElement("label", { className: "label" }, "\u0422\u0435\u043A\u0441\u0442 \u0437\u0430\u044F\u0432\u043A\u0438*"),
                    React.createElement("textarea", { className: "input-text", value: inputText, required: true, placeholder: "Введите текст заявки", onChange: function (e) {
                            setInputText(e.target.value);
                        } })),
                React.createElement("div", { className: "row" },
                    React.createElement("label", { className: "label" }, "\u0417\u0434\u0430\u043D\u0438\u0435"),
                    React.createElement(DropDownBox, { dataSource: buildings, ref: dropDownBoxRefB, showClearButton: true, placeholder: "Оставить пустым", value: selectedBuilding.Name, onValueChanged: function (e) {
                            if (e.value === null) {
                                setSelectedBuilding({ Id: "", Name: "", Rooms: [] });
                                setSelectedCabinet({ Id: "", Name: "" });
                            }
                        } },
                        React.createElement(List, { dataSource: buildings, keyExpr: "Id", displayExpr: "Name", onItemClick: function (e) {
                                var _a;
                                setSelectedBuilding(e.itemData);
                                (_a = dropDownBoxRefB.current) === null || _a === void 0 ? void 0 : _a.instance.close();
                            } }))),
                React.createElement("div", { className: "row" },
                    React.createElement("label", { className: "label" }, "\u041A\u0430\u0431\u0438\u043D\u0435\u0442"),
                    React.createElement(DropDownBox, { dataSource: selectedBuilding.Rooms, ref: dropDownBoxRefC, placeholder: "Оставить пустым", showClearButton: true, value: selectedCabinet.Name, onValueChanged: function (e) {
                            if (e.value === null)
                                setSelectedCabinet({ Id: "", Name: "" });
                        } },
                        React.createElement(List, { dataSource: selectedBuilding.Rooms, keyExpr: "Id", displayExpr: "Name", noDataText: "Нет доступных кабинетов", onItemClick: function (e) {
                                var _a;
                                setSelectedCabinet(e.itemData);
                                (_a = dropDownBoxRefC.current) === null || _a === void 0 ? void 0 : _a.instance.close();
                            } }))),
                React.createElement("div", { className: "row" },
                    React.createElement("label", { className: "label" },
                        "\u041F\u0440\u0438\u043A\u0440\u0435\u043F\u043B\u0435\u043D\u043D\u044B\u0439",
                        React.createElement("br", null),
                        "\u0444\u0430\u0439\u043B"),
                    React.createElement(FileUploader, { labelText: "", selectButtonText: "Обзор...", ref: fileUploaderRef, uploadMode: "useForm", name: "file", onValueChanged: function (e) {
                            setFile(e.value[0]);
                        }, readyToUploadMessage: "Готово" })),
                React.createElement("input", { type: "submit", className: "input-button" })),
            React.createElement(Popup, { title: "Ваша заявка успешно создана…", visible: dialogShow, width: "50%", height: "30%", showCloseButton: true, minHeight: 75, minWidth: 385, onHiding: function () { return setDialogShow(false); }, closeOnOutsideClick: true, contentRender: function () { return React.createElement("p", { className: "popup-content" }, "\u0412\u0430\u0448\u0430 \u0437\u0430\u044F\u0432\u043A\u0430 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0441\u043E\u0437\u0434\u0430\u043D\u0430 \u0438 \u0432 \u0441\u043A\u043E\u0440\u043E\u043C \u0432\u0440\u0435\u043C\u0435\u043D\u0438 \u0431\u0443\u0434\u0435\u0442 \u0440\u0430\u0441\u0441\u043C\u043E\u0442\u0440\u0435\u043D\u0430 \u0434\u0438\u0441\u043F\u0435\u0442\u0447\u0435\u0440\u043E\u043C"); } },
                React.createElement(ToolbarItem, { toolbar: "bottom", widget: "dxButton", location: "before", options: { text: "OK", onClick: function () { return setDialogShow(false); } } })))));
};
export default AAEList;
//# sourceMappingURL=AAEList.js.map