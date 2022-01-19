import * as React from "react";
import List from "devextreme-react/list";
import DropDownBox from "devextreme-react/drop-down-box";
import {Popup, ToolbarItem} from 'devextreme-react/popup';
import {Column, DataGrid, Paging, Sorting} from "devextreme-react/data-grid";
import FileUploader from "devextreme-react/file-uploader";
import {IBuilding, ICabinet, IAAERequest} from "../Types";
import "../style/style-AAEList.css"
import "../style/media-queries.css"
import {useEffect, useRef, useState} from "react";

//Ссылки API
interface API {
    getUrlAAERequests: string;
    getUrlBuildings: string;
    postUrlAAERequests: string;
}

//Функциональная компонента, реализующая контрол «Административно-хозяйственные заявки»
const AAEList: React.FC<API> = ({getUrlAAERequests, getUrlBuildings, postUrlAAERequests}) => {

    // buildings - список зданий
    const [buildings, setBuildings] = useState<IBuilding[]>([]);

    // requests - список заявок
    const [requests, setRequests] = useState<IAAERequest[]>([]);

    // inputText - текст заявки
    const [inputText, setInputText] = useState("");

    // selectedBuilding - выбранное здание
    const [selectedBuilding, setSelectedBuilding] = useState<IBuilding>({Id: "", Name: "", Rooms: []});

    // selectedCabinet - выбранный кабинет
    const [selectedCabinet, setSelectedCabinet] = useState<ICabinet>({Id: "", Name: ""});

    // dialogShow - флаг, отвечающий за открытие диалогового окна
    const [dialogShow, setDialogShow] = useState(false);

    // isSent - флаг, показывающий успешно ли отправлена заявка
    const [isSent, setIsSent] = useState(true);

    // file - поле, хранящее отправляемый файл или null, если файла нет
    const [file, setFile] = useState<any>(null);

    // dropDownBoxRefB - ссылка на первый DropDownBox объект
    const dropDownBoxRefB = useRef<DropDownBox>(null);

    // dropDownBoxRefC - ссылка на второй DropDownBox объект
    const dropDownBoxRefC = useRef<DropDownBox>(null);

    // fileUploaderRef - ссылка на FileUploader объект
    const fileUploaderRef = useRef<FileUploader>(null);

    useEffect(() => {
        async function fetchBuildings() {
            try {
                const response = await fetch(getUrlBuildings);
                const data = await response.json();
                setBuildings(data.buildings);
            } catch (error) {
                console.log(error);
            }
        }
        fetchBuildings();
    },[getUrlBuildings]);

    useEffect(() => {
        //Метод, выполняющий GET запрос на сервер для получения списка заявок
        async function fetchRequests() {
            try {
                const response = await fetch(getUrlAAERequests);
                const data = await response.json();
                setRequests(data.AAERequests);
            } catch (error) {
                console.log(error);
            }
        }
        if (isSent) fetchRequests();
        setIsSent(false);
    },[isSent, getUrlAAERequests]);

    /*Отслеживание клика на кнопку "отправить"
    * Выполняется POST запрос на серверу и отправка JSON строки
    * Если запрос успешно отправлен, то произойдет обновление таблицы и появится диалоговое окно*/
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        let formData = new FormData();
        formData.append("file", file);
        formData.append("AAERequest", JSON.stringify({
                Text: inputText,
                Building: selectedBuilding.Name,
                Cabinet: selectedCabinet.Name,
            }
        ));

        fetch(postUrlAAERequests, {
            method: "POST",
            body: formData
        })
            .then(async response => {
                const data = await response.json();
                if (!response.ok) {
                    const error = (data) || response.status;
                    return Promise.reject(error);
                } else {
                    setIsSent(true);
                    setDialogShow(true);
                }
            })
            .catch(error => {
                alert("Ошибка: " + error)
                console.log(error);
            })

        setInputText("");
        setSelectedBuilding({Id: "", Name: "", Rooms: []});
        setSelectedCabinet({Id: "", Name: ""});

        // Удаление загруженного файла со страницы
        fileUploaderRef.current?.instance.reset();
    }


    return (
        <div className={"background"}>
            <h2>АДМИНИСТРАТИВНО-ХОЗЯЙСТВЕННЫЕ ЗАЯВКИ</h2>

            <div className={"container"}>

                <h3>Мои заявки в АХО</h3>

                <DataGrid dataSource={requests} keyExpr={"id"} showBorders={true}
                          wordWrapEnabled={true} columnHidingEnabled={true} showRowLines={true}
                          noDataText={"Нет заявок"}>

                    <Sorting mode={"single"} ascendingText={"По возростанию"} descendingText={"По убыванию"}
                             clearText={"Очистить"}/>
                    <Paging pageSize={5}/>

                    <Column dataField={"CreationDate"} dataType={"date"} format={"dd.MM.yyyy HH:mm"} width={175}
                            caption={"СОЗДАНА"} defaultSortOrder="desc"/>

                    <Column dataField={"Text"} width={750} caption={"ТЕКСТ"} hidingPriority={0}/>

                    <Column dataField={"Building"} width={175} caption={"ЗДАНИЕ"} hidingPriority={2}/>

                    <Column dataField={"Cabinet"} width={150} caption={"КАБИНЕТ"} hidingPriority={1}/>

                    <Column dataField={"Status"} caption={"СТАТУС"}/>
                </DataGrid>

                <h3>Создать заявку</h3>

                <form onSubmit={handleSubmit}>

                    <div className={"row"}>

                        <label className={"label"}>Текст заявки*</label>

                        <textarea className={"input-text"} value={inputText} required={true}
                                  placeholder={"Введите текст заявки"} onChange={e => {
                            setInputText(e.target.value)
                        }}/>
                    </div>

                    <div className={"row"}>

                        <label className={"label"}>Здание</label>

                        <DropDownBox dataSource={buildings} ref={dropDownBoxRefB}
                                     showClearButton={true} placeholder={"Оставить пустым"}
                                     value={selectedBuilding.Name}
                                     onValueChanged={e => {
                                         if (e.value === null) {
                                             setSelectedBuilding({Id: "", Name: "", Rooms: []});
                                             setSelectedCabinet({Id: "", Name: ""});
                                         }
                                     }}>

                            <List dataSource={buildings} keyExpr={"Id"} displayExpr={"Name"}
                                  onItemClick={e => {
                                      setSelectedBuilding(e.itemData)
                                      dropDownBoxRefB.current?.instance.close();
                                  }}/>
                        </DropDownBox>
                    </div>

                    <div className={"row"}>

                        <label className={"label"}>Кабинет</label>

                        <DropDownBox dataSource={selectedBuilding.Rooms} ref={dropDownBoxRefC}
                                     placeholder={"Оставить пустым"} showClearButton={true}
                                     value={selectedCabinet.Name}
                                     onValueChanged={e => {
                                         if (e.value === null) setSelectedCabinet({Id: "", Name: ""})
                                     }}>

                            <List dataSource={selectedBuilding.Rooms} keyExpr={"Id"} displayExpr={"Name"}
                                  noDataText={"Нет доступных кабинетов"}
                                  onItemClick={e => {
                                      setSelectedCabinet(e.itemData);
                                      dropDownBoxRefC.current?.instance.close();
                                  }}/>
                        </DropDownBox>
                    </div>

                    <div className={"row"}>

                        <label className={"label"}>Прикрепленный<br/>файл</label>

                        <FileUploader labelText={""} selectButtonText={"Обзор..."} ref={fileUploaderRef}
                                      uploadMode={"useForm"} name={"file"} onValueChanged={e => {
                            setFile(e.value![0])
                        }} readyToUploadMessage={"Готово"}/>
                    </div>

                    <input type="submit" className={"input-button"}/>
                </form>
                <Popup title={"Ваша заявка успешно создана…"}
                       visible={dialogShow} width={"50%"} height={"30%"}
                       showCloseButton={true} minHeight={75} minWidth={385}
                       onHiding={() => setDialogShow(false)}
                       closeOnOutsideClick={true}
                       contentRender={() => <p className={"popup-content"}>Ваша заявка успешно создана и в скором
                           времени будет рассмотрена диспетчером</p>}>
                    <ToolbarItem
                        toolbar="bottom"
                        widget="dxButton"
                        location="before"
                        options={{text: "OK", onClick: () => setDialogShow(false)}}>
                    </ToolbarItem>
                </Popup>
            </div>
        </div>
    );
}

export default AAEList;