import { useState } from 'react'
import TodoContext from '../context/todoContext'

const taskTypes = [
    {id:'WORK',type:'work', color:'#D2CEFF', active: false},
    {id:'STUDY',type:'study', color:'#D1E5F7', active: false},
    {id:'ENTERTAINMENT',type:'entertainment', color:'#FFCECE', active: false},
    {id:'FAMILY',type:'family', color:'#DAF2D6', active: false}
]

const EditTodoTab = (props) => {
    const {close, todoItem, onClickThreeDots} = props
    const {_id, title, description, tags, status} = todoItem

    const [newTitle, setTitle] = useState(title)
    const [newDescription, setDescription] = useState(description)
    const [newTags, setTags] = useState(tags)

    const onChangeTitle = event => {
        setTitle(event.target.value)
    }

    const onChangeDescription = event => {
        setDescription(event.target.value)
    }
  return (
    <TodoContext.Consumer>
    {
        props => {
            const {handlePutRequest} = props
            const onSubmitForm = event => {
                event.preventDefault()
                const todo = {
                    _id,
                    title: newTitle,
                    description: newDescription,
                    tags: newTags,
                    status
                }
                handlePutRequest(_id, todo)
                setTitle('')
                setDescription('')
                setTags([])
                close()
                onClickThreeDots()
            }

            const onClickCancelBtn = () => {
                close()
                onClickThreeDots()
            }

            return (
                    <section className="bg-white border border-slate-400 p-10 rounded-xl min-w-[75vw]">
                    <form onSubmit={onSubmitForm} className="flex flex-col">
                        <div className="flex justify-between mb-6">
                            <button type='button' className="bg-gradient-to-r from-red-500 to-orange-400 px-8 py-2 rounded-lg text-white font-semibold" onClick={onClickCancelBtn} >Cancel</button>
                            <button type="submit" className="bg-gradient-to-r from-purple-400 to-blue-400 px-10 py-2 rounded-lg text-white font-semibold" >Save</button>
                        </div>
                            <label className="font-semibold" htmlFor="title" >Title</label>
                            <input className="border border-slate-400 p-2 rounded-lg outline-none focus:border-teal-400 mt-2 mb-5" id="title" placeholder='add a title ...' value={newTitle} onChange={onChangeTitle} />
                            <label className="font-semibold" htmlFor="description" >Description</label>
                            <textarea className="border border-slate-400 p-2 rounded-lg outline-none focus:border-teal-400 mt-2 mb-5" rows={5} id="description" placeholder='add a description ...' value={newDescription} onChange={onChangeDescription} />
                            <h3 className="font-semibold">Tags</h3>
                            <ul className="flex justify-between gap-3 mt-3 flex-wrap">
                                {
                                    taskTypes.map(eachTag => {
                                        const onClickTag = () => {
                                            if (newTags.includes(eachTag.id)){
                                                const updatedTags = newTags.filter(eachId => eachId !== eachTag.id)
                                                setTags(updatedTags)
                                            }else{
                                                setTags([...newTags, eachTag.id])
                                            }
                                        }
                                        return (
                                            <li key={eachTag.id} className='eachTag' >
                                                <button type="button" className={`flex gap-2 items-center px-2 py-2 lg:px-6 rounded-lg ${newTags.includes(eachTag.id)? "border shadow-lg":null}`} onClick={onClickTag} >
                                                    <div className="w-10 h-10 rounded-full" style={{backgroundColor:eachTag.color}}></div>
                                                    <p className="font-medium">{eachTag.type}</p>
                                                </button>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                    </form>
                    </section>
            )
        }
    }
</TodoContext.Consumer>
  )
}

export default EditTodoTab