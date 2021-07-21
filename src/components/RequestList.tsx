import * as React from "react";
import {DataGrid, Column, Paging, Sorting} from 'devextreme-react/data-grid';
import Popup, {ToolbarItem} from "devextreme-react/popup";
import DropDownBox from "devextreme-react/drop-down-box";
import List from "devextreme-react/list"
import {IRequest, IType} from "../Types"
import "../style/style-RequestList.css"

// Интерфейс, реализующий состояние компонента RequestList
interface IRequestListState {
    // requests - список заявок, принмающийся с сервера
    requests: IRequest[]

    // types - типы заявок, принмающихся с сервера
    types: IType[]

    // selectedType - тип заявки, выбранный в dropDownBox'е
    selectedType: string;

    // note - текст заметки
    note: string;

    // isSent - флаг, показывающий успешно ли отправлена заявка
    isSent: boolean;

    // dialogShow - флаг, отвечащий за открытие диалогового окна
    dialogShow: boolean;

    // dropDownBoxRef - ссылка на DropDownBox объект
    dropDownBoxRef: React.RefObject<DropDownBox>;
}

//Ссылки для fetch запросов
interface IRequestListProps {
    getUrlRequests: string;
    getUrlTypes: string;
    postUrlRequests: string;
}

//Класс, реализующий контрол «Заявки в отдел кадров»
export default class RequestList extends React.Component<IRequestListProps, IRequestListState> {

    constructor(props: IRequestListProps) {
        super(props);

        this.state = {
            requests: [],
            types: [],
            selectedType: "",
            note: "",
            isSent: false,
            dialogShow: false,
            dropDownBoxRef: React.createRef()
        };

        //Привязка методов к контексту
        this.calculateCellValue = this.calculateCellValue.bind(this);
        this.calculateDropDownBoxValue = this.calculateDropDownBoxValue.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //Метод, делающий GET запрос на сервер для получения списка заявок
    async fetchRequests() {
        try {
            const response = await fetch(this.props.getUrlRequests);
            const data = await response.json();
            this.setState({requests: data.requests});
        } catch (error) {
            console.log(error);
        }
    }

    //Метод, делающий GET запрос на сервер для получения списка типов заявок
    async fetchTypes() {
        try {
            const response = await fetch(this.props.getUrlTypes);
            const data = await response.json();
            this.setState({types: data.types, selectedType: data.types[0].ID});
        } catch (error) {
            console.log(error);
        }
    }

    //При монтировании компонента делаются два запроса для построенния dataGrid
    componentDidMount() {
        this.fetchRequests()
        this.fetchTypes()
    }

    //Обновляет компонент, если заявка успешно отправлена. Делается повторный запрос на список всех заявок
    componentDidUpdate() {
        if (this.state.isSent) {
            this.fetchRequests();
            this.setState({isSent: false});
        }
    }

    /*Метод, возвращающий название заявки по её id, для dataGrid
      Также просходит проверка на undefined, чтобы метод find не выбросил исключение*/
    calculateCellValue(id: IRequest) {
        return typeof (this.state.types.find(type => type.ID === id.TypeID)?.Name) === 'undefined' ? ""
            : this.state.types.find(type => type.ID === id.TypeID)?.Name;
    }

    /*Метод, возвращающий название заявки по её id, для dropDownBox
    * Также просходит проверка на undefined, чтобы метод find не выбросил исключение */
    calculateDropDownBoxValue(id: string) {
        return typeof (this.state.types.find(type => type.ID === id)?.Name) === 'undefined' ? ""
            : this.state.types.find(type => type.ID === id)?.Name;
    }

    /*Отслеживание клика на кнопку отправить
    * Происходить POST запрос к серверу и отправка JSON строки
    * Если запрос успешно отправлен, то произойдет обновление таблицы и появится диалоговое окно*/
    async handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const requestOptions = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                TypeID: this.state.selectedType,
                Note: this.state.note,
            })
        };

        fetch(this.props.postUrlRequests, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                if (!response.ok) {
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                } else {
                    this.setState({isSent: true});
                    this.setState({dialogShow: true});
                }
            })
            .catch(error => {
                alert("Ошибка: " + error)
                console.log(error);
            })

        this.setState({note: ""});
    }

    render() {
        return (
            <div className={"container"}>
                <h3 className={"title"}>МОИ ЗАЯВКИ В ОТДЕЛ КАДРОВ</h3>

                <DataGrid noDataText={"Нет заявок"} dataSource={this.state.requests}
                          keyExpr="ID" showBorders={true} columnHidingEnabled={true}>
                    <Sorting mode={"single"} ascendingText={"По возростанию"} descendingText={"По убыванию"}
                             clearText={"Очистить"}/>

                    <Paging pageSize={5}/>

                    <Column
                        dataField={"CreationDate"} dataType={"date"} format={"dd.MM.yyyy HH:mm"} caption={"СОЗДАНА"}
                        width={175} hidingPriority={3} defaultSortOrder="desc"/>

                    <Column dataField={"TypeID"} calculateCellValue={this.calculateCellValue}
                            caption={"ТИП ЗАЯВКИ"} width={550} hidingPriority={1}/>

                    <Column dataField={"Note"} caption={"ПРИМЕЧАНИЕ"} hidingPriority={0} width={550}/>

                    <Column dataField={"Status"} caption={"СТАТУС"} hidingPriority={2}/>
                </DataGrid>

                <h3 className={"title"}>СОЗДАТЬ ЗАЯВКУ</h3>
                <h4 className={"mini-title"}>Тип заявки</h4>

                <form onSubmit={this.handleSubmit}>

                    <DropDownBox dataSource={this.state.types} placeholder={"Выберите тип заявки"}
                                 ref={this.state.dropDownBoxRef}
                                 value={this.calculateDropDownBoxValue(this.state.selectedType)}>

                        <List dataSource={this.state.types} keyExpr={"ID"} displayExpr={"Name"} onItemClick={(e) => {
                            this.setState({selectedType: e.itemData.ID});
                            this.state.dropDownBoxRef.current?.instance.close()
                        }}/>
                    </DropDownBox>

                    <h4 className={"mini-title"}>Примечание</h4>

                    <textarea className={"input-text"} value={this.state.note}
                              onChange={e => this.setState({note: e.target.value})}
                              placeholder={"Введите комментарий, если требуется"}/><br/>

                    <input type={"submit"} value={"ОТПРАВИТЬ"} className={"input-button"}/>
                </form>

                <Popup title={"Ваша заявка успешно создана…"}
                       visible={this.state.dialogShow} width={"50%"} height={"30%"}
                       showCloseButton={true} minHeight={75} minWidth={385}
                       onHiding={() => this.setState({dialogShow: false})}
                       closeOnOutsideClick={true}
                       contentRender={() => <p className={"popup-content"}>Ваша заявка успешно создана и в скором
                           времени будет рассмотрена диспетчером</p>}>

                    <ToolbarItem
                        toolbar="bottom"
                        widget="dxButton"
                        location="before"
                        options={{text: "OK", onClick: () => this.setState({dialogShow: false})}}>
                    </ToolbarItem>
                </Popup>
            </div>
        );
    }
}




