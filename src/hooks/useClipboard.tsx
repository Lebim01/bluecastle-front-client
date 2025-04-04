import toast from "react-hot-toast"

const useClipboard = () => {
  const copy = async (data: string) => {
    // Get the text field
    const copyText = document.getElementById('copyInput') as HTMLInputElement
    copyText.value = data

    // Select the text field
    copyText.select()
    copyText.setSelectionRange(0, 99999)

    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value)

    toast.success('Copiado')
  }
  return { copy }
}

export default useClipboard
