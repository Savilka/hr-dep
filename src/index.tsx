import AAEList from "./components/AAEList";
import RequestList from "./components/RequestList";
import * as ReactDOM from "react-dom";
import React from "react";


//Ссылки для отпраки запросов на сервер для RequestList компонента
const getUrlRequests: string = "http://localhost:3000/requests";
const getUrlTypes: string = "http://localhost:3000/types";
const postUrlRequests: string = "http://localhost:3000/requests";

//Ссылки для отпраки запросов на сервер для AAEList компонента
const getUrlAAERequests: string = "http://localhost:3000/AAERequests";
const getUrlBuildings: string = "http://localhost:3000/buildings";
const postUrlAAERequests: string = "http://localhost:3000/AAERequests";



 ReactDOM.render(<RequestList getUrlRequests={getUrlRequests} getUrlTypes={getUrlTypes} postUrlRequests={postUrlRequests} />,
     document.getElementById("app"));
//ReactDOM.render(<AAEList getUrlAAERequests={getUrlAAERequests} getUrlBuildings={getUrlBuildings} postUrlAAERequests={postUrlAAERequests}/>,
 //   document.getElementById("app"));


