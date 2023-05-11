const fs=require('fs/promises')
const path=require('path')
const chalk =require('chalk')

const notesPath=path.join(__dirname,'db.json')
console.log(notesPath)

async function addNote(title) {
  const notes=await getNotes()
  const note={
    title,
    id:Date.now().toString()
  }
  notes.push(note)
  await fs.writeFile(notesPath,JSON.stringify(notes))
  console.log(chalk.bgBlue(note));
}

async function getNotes(params) {
const notes= await fs.readFile(notesPath,{encoding:'utf-8'})
return Array.isArray(JSON.parse(notes))? JSON.parse(notes):[]
}

async function printNotes(params) {
  const notes= await getNotes()
  console.log(chalk.bgGreen('list of notes'))
  notes.forEach(note =>(console.log(chalk.green(`${note.id} ${note.title}`) )));
  }

  async function removeNote(noteId) {
    console.log("id",typeof(noteId.id) )
    const notes= await getNotes()
    console.log(chalk.bgRed('remove of notes'))
    const notesOfRemove=notes.filter(note => note.id !== noteId.id.toString());
    await fs.writeFile(notesPath,JSON.stringify(notesOfRemove))
    notesOfRemove.forEach(note =>(console.log(chalk.red(`${note.id} ${note.title}`))))
    }

module.exports={
  addNote,getNotes,printNotes,removeNote
}