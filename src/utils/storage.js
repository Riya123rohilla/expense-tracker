export const getLocal = (key, fallback=null) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch(e){
    console.error('getLocal error', e)
    return fallback
  }
}

export const setLocal = (key, value) => {
  try{
    localStorage.setItem(key, JSON.stringify(value))
  }catch(e){
    console.error('setLocal error', e)
  }
}

export const removeLocal = (key) => {
  try{ localStorage.removeItem(key) }catch(e){console.error(e)}
}
