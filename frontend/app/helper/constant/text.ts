export const ADMIN_HEADER = {
  HOME: 'ホーム',
}

export const ADMIN_SIDEBAR = {
  DASHBOARD: 'ダッシュボード',
  BLOG: '記事',
  BLOG_ARCHIVE: '記事一覧',
  BLOG_CREATE: '記事作成',
  BLOG_TAG_ARCHIVE: 'タグ一覧',
  RECIPE: 'レシピ',
  RECIPE_ARCHIVE: 'レシピ一覧',
  RECIPE_CREATE: 'レシピ作成',
  RECIPE_TAG_ARCHIVE: 'タグー一覧',
  FLAVOR: 'フレーバー',
  FLAVOR_ARCHIVE: 'フレーバー一覧',
  FLAVOR_CREATE: 'フレーバー登録',
  FLAVOR_BRAND_ARCHIVE: 'ブランド',
}

export const ADMIN_DASHBOARD = {
  DASHBOARD: 'ダッシュボード',
  BLOG: '記事',
  RECIPE: 'レシピ',
  FLAVOR: 'フレーバー',
}

export const ADMIN_TABLE = {
  DELETE: '削除',
  EDIT: '編集',
}

export const ADMIN_TABLE_DELETE_MODAL = {
  DESC: '本当に削除してもよろしいでしょうか？',
  CANCEL: 'キャンセル',
  DELETE: '削除',
}

export const ADMIN_BLOG_ARCHIVE = {
  HEADING: 'ブログ記事一覧',
  CREATE: '新規作成',
  TABLE: {
    ID: 'ID',
    UPDATE_DATE: '更新日',
    TITLE: 'タイトル',
    TAG: 'タグ',
    CONTENTS: 'コンテンツ',
    THUMBNAIL: 'サムネイル',
  },
}

export const ADMIN_BLOG_CREATE = {
  HEADING: 'ブログ記事作成',
  BACK: '一覧へ戻る',
  INPUT: {
    TITLE_LABEL: 'タイトル',
    TITLE_PLACEHOLDER: 'タイトル',
    SLUG_LABEL: 'スラッグ',
    SLUG_PLACEHOLDER: 'slug',
    TAG_LABEL: 'タグ',
    TAG_PLACEHOLDER: 'タグ',
    TAG_SEARCH_NOTHING: '見つかりません',
    CONTENTS_LABEL: 'コンテンツ',
    CONTENTS_PLACEHOLDER: 'コンテンツ',
    THUMBNAIL_LABEL: 'サムネイル',
    THUMBNAIL_PLACEHOLDER: 'サムネイル',
    ERROR: {
      TITLE: 'タイトルを入力してください',
      CONTENTS: 'コンテンツを入力してください',
    }
  },
  SUBMIT: '保存する',
}

export const ADMIN_BLOG_EDIT = {
  HEADING: 'ブログ記事編集',
  BACK: '一覧へ戻る',
  INPUT: {
    TITLE_LABEL: 'タイトル',
    TITLE_PLACEHOLDER: 'タイトル',
    SLUG_LABEL: 'スラッグ',
    SLUG_PLACEHOLDER: 'slug',
    TAG_LABEL: 'タグ',
    TAG_PLACEHOLDER: 'タグ',
    TAG_SEARCH_NOTHING: '見つかりません',
    CONTENTS_LABEL: 'コンテンツ',
    CONTENTS_PLACEHOLDER: 'コンテンツ',
    THUMBNAIL_LABEL: 'サムネイル',
    THUMBNAIL_PLACEHOLDER: 'サムネイル',
    ERROR: {
      TITLE: 'タイトルを入力してください',
      CONTENTS: 'コンテンツを入力してください',
    }
  },
  SUBMIT: '保存する',
}

export const ADMIN_BLOG_TAG_INDEX = {
  HEADING: 'タグ',
  INPUT: {
    NAME: 'タグ名',
    NAME_PLACEHOLDER: '甘い',
    SLUG: 'スタッグ',
    SLUG_PLACEHOLDER: 'slug',
    SUBMIT: '保存',
    ERROR: {
      NAME: 'タグ名を入力してください。',
      SLUG: 'スラッグを入力してください。'
    }
  },
  TABLE: {
    ID: 'ID',
    NAME: '名前',
    SLUG: 'スラッグ',
  },
}

export const ADMIN_BLOG_TAG_EDIT = {
  HEADING: 'タグ編集',
  BACK: '一覧へ戻る',
  INPUT: {
    NAME: 'タグ名',
    NAME_PLACEHOLDER: '甘い',
    SLUG: 'スタッグ',
    SLUG_PLACEHOLDER: 'slug',
    SUBMIT: '保存',
    ERROR: {
      NAME: 'タグ名を入力してください。',
      SLUG: 'スラッグを入力してください。'
    }
  },
}

export const ADMIN_FLAVOR_ARCHIVE = {
  HEADING: 'フレーバー一覧',
  CREATE: '新規作成',
  TABLE: {
    ID: 'ID',
    UPDATE_DATE: '更新日',
    FLAVOR_NAME: 'フレーバー名',
    BRAND: 'ブランド',
    DESC: 'コメント',
  },
}

export const ADMIN_FLAVOR_CREATE = {
  HEADING: 'フレーバー新規作成',
  INPUT: {
    FLAVOR_NAME_LABEL: 'フレーバー名',
    FLAVOR_NAME_PLACEHOLDER: 'レモン',
    FLAVOR_SLUG_LABEL: 'スラッグ',
    FLAVOR_SLUG_PLACEHOLDER: 'lemon',
    FLAVOR_BRAND_LABEL: 'ブランド',
    FLAVOR_BRAND_PLACEHOLDER: 'Alkfer hell',
    FLAVOR_COMMENT_LABEL: 'コメント',
    FLAVOR_COMMENT_PLACEHOLDER: 'コメントがあれば入力',
  },
  INPUT_ERROR: {
    NAME: 'フレーバー名を入力してください',
    SLUG: 'スラッグを入力してください',
    BRAND: 'ブランドを選択してください',
    COMMENT: 'スラッグを入力してください',
  },
  SUBMIT: '保存する',
}

export const ADMIN_FLAVOR_EDIT = {
  HEADING: 'フレーバー編集',
  INPUT: {
    FLAVOR_NAME_LABEL: 'フレーバー名',
    FLAVOR_NAME_PLACEHOLDER: 'レモン',
    FLAVOR_SLUG_LABEL: 'スラッグ',
    FLAVOR_SLUG_PLACEHOLDER: 'lemon',
    FLAVOR_BRAND_LABEL: 'ブランド',
    FLAVOR_BRAND_PLACEHOLDER: 'Alkfer hell',
    FLAVOR_COMMENT_LABEL: 'コメント',
    FLAVOR_COMMENT_PLACEHOLDER: 'コメントがあれば入力',
  },
  INPUT_ERROR: {
    NAME: 'フレーバー名を入力してください',
    SLUG: 'スラッグを入力してください',
    BRAND: 'ブランドを選択してください',
    COMMENT: 'スラッグを入力してください',
  },
  SUBMIT: '保存する',
}

export const ADMIN_FLAVOR_BRAND_ARCHIVE = {
  HEADING: 'ブランド一覧',
  CREATE: '新規作成',
  TABLE: {
    ID: 'ID',
    UPDATE_DATE: '更新日',
    BRAND_NAME: 'ブランド名',
    ABBREVIATED_NAME: '省略記法',
    SLUG: 'スラッグ',
  },
  CANCEL: 'キャンセル',
  DELETE: '削除',
  DELETE_DESC: '本当に削除してもよろしいでしょうか？',
}

export const ADMIN_FLAVOR_BRAND_CREATE = {
  HEADING: 'ブランド新規作成',
  INPUT: {
    BRAND_NAME_LABEL: 'ブランド名',
    BRAND_NAME_PLACEHOLDER: 'Alkfer hell',
    BRAND_ABBREVIATED_NAME_LABEL: '省略表記',
    BRAND_ABBREVIATED_NAME_PLACEHOLDER: 'AF',
    BRAND_SLUG_LABEL: 'スラッグ',
    BRAND_SLUG_PLACEHOLDER: 'alkfer-hell',
  },
  INPUT_ERROR: {
    BRAND_NAME: 'ブランド名を入力してください',
    BRAND_ABBREVIATED_NAME: '省略記法を入力してください',
    BRAND_SLUG: 'スラッグを入力してください',
  },
  SUBMIT: '保存する',
}

export const ADMIN_FLAVOR_BRAND_EDIT = {
  HEADING: 'ブランド編集',
  BACK: '一覧へ戻る',
  INPUT: {
    BRAND_NAME_LABEL: 'ブランド名',
    BRAND_NAME_PLACEHOLDER: 'Alkfer hell',
    BRAND_ABBREVIATED_NAME_LABEL: '省略表記',
    BRAND_ABBREVIATED_NAME_PLACEHOLDER: 'AF',
    BRAND_SLUG_LABEL: 'スラッグ',
    BRAND_SLUG_PLACEHOLDER: 'alkfer-hell',
  },
  INPUT_ERROR: {
    BRAND_NAME: 'ブランド名を入力してください',
    BRAND_ABBREVIATED_NAME: '省略記法を入力してください',
    BRAND_SLUG: 'スラッグを入力してください',
  },
  SUBMIT: '更新する',
}

export const ADMIN_RECIPE_TAG_ARCHIVE = {
  HEADING: 'タグ一覧',
  CREATE: '新規作成',
  TABLE: {
    ID: 'ID',
    UPDATE_DATE: '更新日',
    NAME: 'タグ名',
  },
  CANCEL: 'キャンセル',
  DELETE: '削除',
  DELETE_DESC: '本当に削除してもよろしいでしょうか？',
}

export const ADMIN_RECIPE_TAG_CREATE = {
  HEADING: 'タグ新規作成',
  INPUT: {
    NAME_LABEL: 'タグ名',
    NAME_PLACEHOLDER: '甘い',
  },
  INPUT_ERROR: {
    NAME: 'タグ名を入力してください',
  },
  SUBMIT: '保存する',
}

export const ADMIN_RECIPE_TAG_EDIT = {
  HEADING: 'タグ編集',
  BACK: '一覧へ戻る',
  INPUT: {
    NAME_LABEL: 'タグ名',
    NAME_PLACEHOLDER: '甘い',
  },
  INPUT_ERROR: {
    NAME: 'タグ名を入力してください',
  },
  SUBMIT: '更新する',
}