class myClass{
  state=[1,2]
  constructor(){
    this.message = '李永琪'
  }
  show(){
    console.log(this.message)
    console.log(this.state)
  }
}
const info = new myClass()
export default info