import { useState } from 'react'



export const useHandleImageWithModal = () => {
  const [opened, setOpened] = useState(false)
  const [isThumbnailSelected, setIsThumbnailSelected] = useState(false)
  const [isRichEditorSelected, setIsRichEditorSelected] = useState(false)
  const [preSelectedModalImage, setPreSelectedModalImage] = useState('')
  const [selectedThum, setSelectedThum] = useState('')


  // サムネイル候補の選択
  const preSelectImage = (e: React.MouseEvent<HTMLElement>) => {
    const $markRemoveBorder = document.querySelector<HTMLElement>(
      '.markRemoveBorder.border'
    )
    $markRemoveBorder?.classList.remove('border')

    // チェックの印をつけるためのコード
    e.currentTarget.parentElement!.parentElement!.parentElement!.classList.add(
      'border'
    )

    // 選択肢ているurlを取得するためのコード
    const preSelectImageSrc =
      e.currentTarget.children[0].children[0].children[0].getAttribute('src')
    setPreSelectedModalImage(() => {
      return preSelectImageSrc!
    })
  }

  // サムネイルの設定
  const selectThum = () => {
    setSelectedThum(() => {
      return preSelectedModalImage
    })
    setOpened(false)
    setIsThumbnailSelected(false)
  }

  // リッチテキストに選択した画像を挿入する
  // const insertRichEditorImgHandler = () => {
  //   setOpened(false)
  //   setIsRichEditorSelected(false)
  //   if (preSelectedModalImage) {
  //     editor!.chain().focus().setImage({ src: preSelectedModalImage }).run()
  //   }
  // }

  // リッチテキストに挿入するための画像を選択するモーダルの表示
  const insertRichTextImageHandler = () => {
    setOpened(true)
    setIsRichEditorSelected(true)
  }

  // サムネイルのための画像を選択するモーダルの表示
  const thumSelectModalHandler = () => {
    setOpened(true)
    setIsThumbnailSelected(true)
  }

  // 画像選択モーダルの非表示
  const modalCloseHandler = () => {
    setOpened(false)
    setIsRichEditorSelected(false)
    setIsThumbnailSelected(false)
  }

  return {
    opened,
    isThumbnailSelected,
    isRichEditorSelected,
    preSelectedModalImage,
    selectedThum,
    setOpened,
    setSelectedThum,
    setIsRichEditorSelected,
    preSelectImage,
    selectThum,
    // insertRichEditorImgHandler,
    insertRichTextImageHandler,
    thumSelectModalHandler,
    modalCloseHandler,
  }
}
