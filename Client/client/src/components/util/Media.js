export const addMedia = (state, files) => {
    const temp = [...state]
    let err = ''

    files.forEach(file =>{
        if(!file) return err='File does not exit'
        if(file.size > 1024*1024*15) return err='File is larger than 15mb'
        return temp.push(file);
    })
    if(err) return {success: '', error: err}
    return {success: temp, error: ''}
}

export const removeMedia = (state, id) => {
    const temp = [...state]
    temp.splice(id,1)
    return temp
}