import AAEList from "./components/AAEList";
import * as ReactDOM from "react-dom";
import React from "react";
//Ссылки для отпраки запросов на сервер для RequestList компонента
var getUrlRequests = "http://localhost:3000/requests";
var getUrlTypes = "http://localhost:3000/types";
var postUrlRequests = "http://localhost:3000/requests";
//Ссылки для отпраки запросов на сервер для AAEList компонента
var getUrlAAERequests = "http://localhost:3000/AAERequests";
var getUrlBuildings = "http://localhost:3000/buildings";
var postUrlAAERequests = "http://localhost:3000/AAERequests";
// ReactDOM.render(<RequestList getUrlRequests={getUrlRequests} getUrlTypes={getUrlTypes} postUrlRequests={postUrlRequests} />,
//     document.getElementById("app"));
ReactDOM.render(React.createElement(AAEList, { getUrlAAERequests: getUrlAAERequests, getUrlBuildings: getUrlBuildings, postUrlAAERequests: postUrlAAERequests }), document.getElementById("app"));
//# sourceMappingURL=index.js.map