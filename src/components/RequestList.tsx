import * as React from "react";
import {DataGrid, Column, Paging, Sorting} from 'devextreme-react/data-grid';
import Popup, {ToolbarItem} from "devextreme-react/popup";
import DropDownBox from "devextreme-react/drop-down-box";
import List from "devextreme-react/list"
import {IRequest, IType} from "../Types"
import "../style/style-RequestList.css"
import {useEffect, useRef, useState} from "react";

//Ссылки API
interface API {
    getUrlRequests: string;
    getUrlTypes: string;
    postUrlRequests: string;
}

//Функциональная компонента, реализующая контрол «Заявки в отдел кадров»
const RequestList: React.FC<API> = ({getUrlRequests, getUrlTypes, postUrlRequests}) => {

    // requests - список заявок
    const [requests, setRequests] = useState<IRequest[]>([]);

    // types - типы заявок
    const [types, setTypes] = useState<IType[]>([]);

    // selectedType - тип заявки, выбранный в dropDownBox'е
    const [selectedType, setSelectedType] = useState("");

    // note - текст заметки
    const [note, setNote] = useState("");

    // isSent - флаг, показывающий успешно ли отправлена заявка
    const [isSent, setIsSent] = useState(true);

    // dialogShow - флаг, отвечающий за открытие диалогового окна
    const [dialogShow, setDialogShow] = useState(false);

    // dropDownBoxRef - ссылка на объект DropDownBox
    const dropDownBoxRef = useRef<DropDownBox>(null)

    useEffect(() => {
        // Функция, выполняющая GET запрос на сервер для получения списка типов заявок
        async function fetchTypes() {
            try {
                const response = await fetch(getUrlTypes);
                const data = await response.json();
                setTypes(data.types);
                setSelectedType(data.types[0].ID);
            } catch (error) {
                console.log(error);
            }
        }

        fetchTypes();
    }, [getUrlTypes]);

    useEffect(() => {
        // Функция, выполняющая GET запрос на сервер для получения списка заявок
        async function fetchRequests() {
            try {
                const response = await fetch(getUrlRequests);
                const data = await response.json();
                setRequests(data.requests);
            } catch (error) {
                console.log(error);
            }
        }
        if (isSent) fetchRequests();
        setIsSent(false);
    }, [isSent, getUrlRequests]);


    /*Метод, возвращающий название заявки по её id, для dataGrid
      Также происходит проверка на undefined, чтобы метод find не выбросил исключение*/
    function calculateCellValue(id: IRequest) {
        return typeof (types.find(type => type.ID === id.TypeID)?.Name) === 'undefined' ? ""
            : types.find(type => type.ID === id.TypeID)?.Name;
    }

    /*Метод, возвращающий название заявки по её id, для dropDownBox
    * Также происходит проверка на undefined, чтобы метод find не выбросил исключение */
    function calculateDropDownBoxValue(id: string) {
        return typeof (types.find(type => type.ID === id)?.Name) === 'undefined' ? ""
            : types.find(type => type.ID === id)?.Name;
    }

    /*Отслеживание клика на кнопку отправить
    * Выполняется POST запрос на серверу и отправка JSON строки
    * Если запрос успешно отправлен, то произойдет обновление таблицы и появится диалоговое окно*/
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const requestOptions = {
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
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                if (!response.ok) {
                    const error = (data && data.message) || response.status;
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

        setNote("");
    }


    return (
        <div className={"container"}>
            <h3 className={"title"}>МОИ ЗАЯВКИ В ОТДЕЛ КАДРОВ</h3>

            <DataGrid noDataText={"Нет заявок"} dataSource={requests}
                      keyExpr="ID" showBorders={true} columnHidingEnabled={true}>
                <Sorting mode={"single"} ascendingText={"По возростанию"} descendingText={"По убыванию"}
                         clearText={"Очистить"}/>

                <Paging pageSize={5}/>

                <Column
                    dataField={"CreationDate"} dataType={"date"} format={"dd.MM.yyyy HH:mm"} caption={"СОЗДАНА"}
                    width={175} hidingPriority={3} defaultSortOrder="desc"/>

                <Column dataField={"TypeID"} calculateCellValue={calculateCellValue}
                        caption={"ТИП ЗАЯВКИ"} width={550} hidingPriority={1}/>

                <Column dataField={"Note"} caption={"ПРИМЕЧАНИЕ"} hidingPriority={0} width={550}/>

                <Column dataField={"Status"} caption={"СТАТУС"} hidingPriority={2}/>
            </DataGrid>

            <h3 className={"title"}>СОЗДАТЬ ЗАЯВКУ</h3>
            <h4 className={"mini-title"}>Тип заявки</h4>

            <form onSubmit={handleSubmit}>

                <DropDownBox dataSource={types} placeholder={"Выберите тип заявки"}
                             ref={dropDownBoxRef}
                             value={calculateDropDownBoxValue(selectedType)}>

                    <List dataSource={types} keyExpr={"ID"} displayExpr={"Name"} onItemClick={(e) => {
                        setSelectedType(e.itemData.ID);
                        dropDownBoxRef.current?.instance.close();
                    }}/>
                </DropDownBox>

                <h4 className={"mini-title"}>Примечание</h4>

                <textarea className={"input-text"} value={note}
                          onChange={e => setNote(e.target.value)}
                          placeholder={"Введите комментарий, если требуется"}/><br/>

                <input type={"submit"} value={"ОТПРАВИТЬ"} className={"input-button"}/>
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
    );
}


export default RequestList;




