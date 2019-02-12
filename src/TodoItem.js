import React, {Component, Fragment} from 'react'
import './style.less'

class TodoItem extends Component {

    handleItemClick (index,e) {
        console.log(index)
        console.log(e)
        this.props.delete(index)
        e.stopPropagation();
    }
    handleDone (index) {
        this.props.done(index)
    }

    handleUnDone (index) {
        this.props.undone(index)
    }

    handleShowBtn (index) {
        this.props.showbtn(index)
    }

    handleHideBtn (index) {
        this.props.hidebtn(index)
    }

    getTodoItems () {
        return (
            this.props.list.map((t, index) => {
                return (
                    <Fragment key={index}>
                        <div className='list-li' onDoubleClick={this.handleUnDone.bind(this, index)} onClick={this.handleDone.bind(this, index)}  onMouseEnter={this.handleShowBtn.bind(this, index)} onMouseLeave={this.handleHideBtn.bind(this, index)}>
                            <div className={t.done ? 'delete-line spanline' : 'spanline'}>{t.value}</div>
                            <button id='delBtn' className={t.butshow ? 'btn-show' : 'btn-hide'}  onClick={(e) => this.handleItemClick(index,e)}>Del</button>
                        </div>


                    </Fragment>
                )
            })
        )
    }

    render () {
        return this.getTodoItems()
    }
}

export default  TodoItem
