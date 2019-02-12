import React,{Component,Fragment} from 'react';
import TodoItem from './TodoItem'
import './style.less'

class TodoList extends Component {

  constructor (props) {
    super(props)
      this.state = {
          list: [],
          inputAble: false,
          inputValue: ''
      }
    this.handleBtnClick = this.handleBtnClick.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleDone = this.handleDone.bind(this)
    this.handleUnDone = this.handleUnDone.bind(this)
    this.handleShowBtn = this.handleShowBtn.bind(this)
    this.handleHideBtn = this.handleHideBtn.bind(this)
  }
  componentDidMount () {
      var listFromLocal = this.getLocalStorage('list')
      if(listFromLocal !== '' && listFromLocal !== undefined && listFromLocal !== null) {
          var list =  JSON.parse(listFromLocal)
          this.setState({
              list:list
          })
      } else {
         this.setState({
             list: [],
         })
      }
  }

  handleInputChange (e) {
      this.setState({
          inputValue: e.target.value
      })
      if (e.target.value !== '') {
         this.setState({
             inputAble: true
         })
      } else {
          this.setState({
              inputAble: false
          })
      }
  }


  handleBtnClick () {
      if(this.state.inputValue !== '') {
          this.setState(
              {
                  list: [...this.state.list, {value:this.state.inputValue,done:false,butshow:false}].reverse(),
                  inputValue: '',
                  inputAble: false
              },
              () => {
                  this.setLocalStorage('list', JSON.stringify(this.state.list))
              }
          )

      }

  }

    setLocalStorage (key,val) {
       window.localStorage.setItem(key, val)
    }

    getLocalStorage (key) {
        var outValue = window.localStorage.getItem(key)
        return outValue
    }

    handleDelete (index) {
        const list = [...this.state.list]
        list.splice(index, 1)
        this.setState({
            list
        }, function () {
            this.setLocalStorage('list', JSON.stringify(this.state.list))
        })

    }

    handleDone (index) {
        const list = [...this.state.list]
        list[index].done = true
        this.setState({
            list
        },() => {
            this.setLocalStorage('list', JSON.stringify(this.state.list))
        })
    }

    handleUnDone (index) {
        const list = [...this.state.list]
        list[index].done = false
        this.setState({
            list
        },() => {
            this.setLocalStorage('list', JSON.stringify(this.state.list))
        })
    }

    handleShowBtn (index) {
        const list = [...this.state.list]
        list[index].butshow = true
        this.setState({
            list
        },() => {
            this.setLocalStorage('list', JSON.stringify(this.state.list))
        })
    }
    handleHideBtn (index) {
        const list = [...this.state.list]
        list[index].butshow = false
        this.setState({
            list
        },() => {
            this.setLocalStorage('list', JSON.stringify(this.state.list))
        })
    }

    KeyUpHandle (e) {
        if (e.keyCode === 13) {
            this.handleBtnClick()
        }
    }

  render() {
    return (
      <Fragment>
        <div className='top'>
            <div className='top-con'>
                <input  className='top-input' type="text"  onKeyUp={(e) => this.KeyUpHandle(e)} value={this.state.inputValue}  onChange={this.handleInputChange}/>
                <button className='btn add-btn btn-red'  disabled={!this.state.inputAble}  onClick={this.handleBtnClick}>Add</button>
            </div>

        </div>
          <div className='bottom'>
            <div className='bottom-con'>
                <TodoItem list={this.state.list} showbtn={this.handleShowBtn} hidebtn={this.handleHideBtn} delete={this.handleDelete} done={this.handleDone} undone={this.handleUnDone}/>
            </div>
          </div>
      </Fragment>
    );
  }
}

export default TodoList;
