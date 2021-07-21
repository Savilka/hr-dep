import * as React from "react";
import List from "devextreme-react/list";
import DropDownBox from "devextreme-react/drop-down-box";
import {Popup, ToolbarItem} from 'devextreme-react/popup';
import {Column, DataGrid, Paging, Sorting} from "devextreme-react/data-grid";
import FileUploader from "devextreme-react/file-uploader";
import {IBuilding, ICabinet, IAAERequest} from "../Types";
import "../style/style-AAEList.css"
import "../style/media-queries.css"


// Интерфейс, реализующий состояния компонента AAEList
interface IAAEListState {

    // buildings - список зданий, принимающийся с сервера
    buildings: IBuilding[];

    // requests - список заявок, принмающийся с сервера
    requests: IAAERequest[];

    // inputText - текст заявки
    inputText: string;

    // selectedBuilding - выбранное здание
    selectedBuilding: IBuilding;

    // selectedCabinet - выбранны кабинет
    selectedCabinet: ICabinet;

    // dialogShow - флаг, отвечащий за открытие диалогового окна
    dialogShow: boolean;

    // isSent - флаг, показывающий успешно ли отправлена заявка
    isSent: boolean;

    // file - поле, хранящие отправляем файл или null, если файла нет
    file: any;

    // dropDownBoxRefB - ссылка на первый DropDownBox объект
    dropDownBoxRefB: React.RefObject<DropDownBox>;

    // dropDownBoxRefC - ссылка на второй DropDownBox объект
    dropDownBoxRefC: React.RefObject<DropDownBox>;

    // fileUploaderRef - ссылка на FileUploader объект
    fileUploaderRef: React.RefObject<FileUploader>;
}

//Ссылки для fetch запросов
interface IAAEListProps {
    getUrlAAERequests: string;
    getUrlBuildings: string;
    postUrlAAERequests: string;
}


//Класс, реализующий контрол «Административно-хозяйственные заявки»
export default class AAEList extends React.Component<IAAEListProps, IAAEListState> {

    constructor(props: IAAEListProps) {
        super(props);

        this.state = {
            buildings: [], requests: [], inputText: "", selectedBuilding: {Id: "", Name: "", Rooms: []},
            selectedCabinet: {Id: "", Name: ""}, dialogShow: false, isSent: false,
            dropDownBoxRefB: React.createRef(), dropDownBoxRefC: React.createRef(),
            fileUploaderRef: React.createRef(), file: null
        };

        //Привязка методов к контексту
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //Метод, делающий GET запрос на сервер для получения списка заявок
    async fetchRequests() {
        try {
            const response = await fetch(this.props.getUrlAAERequests);
            const data = await response.json();
            this.setState({requests: data.AAERequests});
        } catch (error) {
            console.log(error);
        }
    }

    //Метод, делающий GET запрос на сервер для получения списка зданий
    async fetchBuildings() {
        try {
            const response = await fetch(this.props.getUrlBuildings);
            const data = await response.json();
            this.setState({buildings: data.buildings});
        } catch (error) {
            console.log(error);
        }
    }

    //При монтировании компонента делаются два запроса для построенния dataGrid
    componentDidMount() {
        this.fetchRequests()
        this.fetchBuildings()
    }

    //Обновляет компонент, если заявка успешно отправлена. Делается повторный запрос на список всех заявок
    componentDidUpdate() {
        if (this.state.isSent) {
            this.fetchRequests();
            this.setState({isSent: false});
        }
    }

    /*Отслеживание клика на кнопку отправить
    * Происходить POST запрос к серверу и отправка JSON строки
    * Если запрос успешно отправлен, то произойдет обновление таблицы и появится диалоговое окно*/
    async handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        let formData = new FormData();
        formData.append("file", this.state.file);
        formData.append("AAERequest", JSON.stringify({
                Text: this.state.inputText,
                Building: this.state.selectedBuilding.Name,
                Cabinet: this.state.selectedCabinet.Name,
            }
        ));

        fetch(this.props.postUrlAAERequests, {
            method: "POST",
            body: formData
        })
            .then(async response => {
                const data = await response.json();
                if (!response.ok) {
                    const error = (data) || response.status;
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

        this.setState({
            inputText: "", file: null, selectedBuilding: {Id: "", Name: "", Rooms: []},
            selectedCabinet: {Id: "", Name: ""}
        });

        // Удаление загруженного файла со старницы
        this.state.fileUploaderRef.current?.instance.reset();
    }

    render() {
        return (
            <div className={"background"}>
                <h2>АДМИНИСТРАТИВНО-ХОЗЯЙСТВЕННЫЕ ЗАЯВКИ</h2>

                <div className={"container"}>

                    <h3>Мои заявки в АХО</h3>

                    <DataGrid dataSource={this.state.requests} keyExpr={"id"} showBorders={true}
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

                    <form onSubmit={this.handleSubmit} action={this.props.postUrlAAERequests}>

                        <div className={"row"}>

                            <label className={"label"}>Текст заявки*</label>

                            <textarea className={"input-text"} value={this.state.inputText} required={true}
                                      placeholder={"Введите текст заявки"} onChange={e => {
                                this.setState({inputText: e.target.value})
                            }}/>
                        </div>

                        <div className={"row"}>

                            <label className={"label"}>Здание</label>

                            <DropDownBox dataSource={this.state.buildings} ref={this.state.dropDownBoxRefB}
                                         showClearButton={true} placeholder={"Оставить пустым"}
                                         value={this.state.selectedBuilding.Name}
                                         onValueChanged={e => {
                                             if (e.value === null)
                                                 this.setState({
                                                     selectedBuilding: {Id: "", Name: "", Rooms: []},
                                                     selectedCabinet: {Id: "", Name: ""}
                                                 })
                                         }}>

                                <List dataSource={this.state.buildings} keyExpr={"Id"} displayExpr={"Name"}
                                      onItemClick={e => {
                                          this.setState({
                                              selectedBuilding: e.itemData,
                                              selectedCabinet: {Id: "", Name: ""}
                                          });
                                          this.state.dropDownBoxRefB.current?.instance.close();
                                      }}/>
                            </DropDownBox>
                        </div>

                        <div className={"row"}>

                            <label className={"label"}>Кабинет</label>

                            <DropDownBox dataSource={this.state.selectedBuilding.Rooms} ref={this.state.dropDownBoxRefC}
                                         placeholder={"Оставить пустым"} showClearButton={true}
                                         value={this.state.selectedCabinet.Name}
                                         onValueChanged={e => {
                                             if (e.value === null) this.setState({selectedCabinet: {Id: "", Name: ""}})
                                         }}>

                                <List dataSource={this.state.selectedBuilding.Rooms} keyExpr={"Id"} displayExpr={"Name"}
                                      noDataText={"Нет доступных кабинетов"}
                                      onItemClick={e => {
                                          this.setState({selectedCabinet: e.itemData});
                                          this.state.dropDownBoxRefC.current?.instance.close();
                                      }}/>
                            </DropDownBox>
                        </div>

                        <div className={"row"}>

                            <label className={"label"}>Прикрепленный<br/>файл</label>

                            <FileUploader labelText={""} selectButtonText={"Обзор..."} ref={this.state.fileUploaderRef}
                                          uploadMode={"useForm"} name={"file"} onValueChanged={e => {
                                this.setState({file: e.value![0]})
                            }} readyToUploadMessage={"Готово"}/>
                        </div>

                        <input type="submit" className={"input-button"}/>
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
            </div>

        );
    }
}