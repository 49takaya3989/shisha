export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  time: any
  timestamp: any
  timestamptz: any
}

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']>
  _gt?: InputMaybe<Scalars['Int']>
  _gte?: InputMaybe<Scalars['Int']>
  _in?: InputMaybe<Array<Scalars['Int']>>
  _is_null?: InputMaybe<Scalars['Boolean']>
  _lt?: InputMaybe<Scalars['Int']>
  _lte?: InputMaybe<Scalars['Int']>
  _neq?: InputMaybe<Scalars['Int']>
  _nin?: InputMaybe<Array<Scalars['Int']>>
}

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']>
  _gt?: InputMaybe<Scalars['String']>
  _gte?: InputMaybe<Scalars['String']>
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']>
  _in?: InputMaybe<Array<Scalars['String']>>
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']>
  _is_null?: InputMaybe<Scalars['Boolean']>
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']>
  _lt?: InputMaybe<Scalars['String']>
  _lte?: InputMaybe<Scalars['String']>
  _neq?: InputMaybe<Scalars['String']>
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']>
  _nin?: InputMaybe<Array<Scalars['String']>>
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']>
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']>
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']>
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']>
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']>
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']>
}

/** ブログとタグを紐付ける中間テーブル */
export type Blog_Blog_Tags = {
  __typename?: 'blog_blog_tags'
  /** An object relationship */
  blog: Blogs
  blog_id: Scalars['Int']
  /** An object relationship */
  blog_tag: Blog_Tags
  blog_tag_id: Scalars['Int']
  id: Scalars['Int']
}

/** aggregated selection of "blog_blog_tags" */
export type Blog_Blog_Tags_Aggregate = {
  __typename?: 'blog_blog_tags_aggregate'
  aggregate?: Maybe<Blog_Blog_Tags_Aggregate_Fields>
  nodes: Array<Blog_Blog_Tags>
}

export type Blog_Blog_Tags_Aggregate_Bool_Exp = {
  count?: InputMaybe<Blog_Blog_Tags_Aggregate_Bool_Exp_Count>
}

export type Blog_Blog_Tags_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Blog_Blog_Tags_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']>
  filter?: InputMaybe<Blog_Blog_Tags_Bool_Exp>
  predicate: Int_Comparison_Exp
}

/** aggregate fields of "blog_blog_tags" */
export type Blog_Blog_Tags_Aggregate_Fields = {
  __typename?: 'blog_blog_tags_aggregate_fields'
  avg?: Maybe<Blog_Blog_Tags_Avg_Fields>
  count: Scalars['Int']
  max?: Maybe<Blog_Blog_Tags_Max_Fields>
  min?: Maybe<Blog_Blog_Tags_Min_Fields>
  stddev?: Maybe<Blog_Blog_Tags_Stddev_Fields>
  stddev_pop?: Maybe<Blog_Blog_Tags_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Blog_Blog_Tags_Stddev_Samp_Fields>
  sum?: Maybe<Blog_Blog_Tags_Sum_Fields>
  var_pop?: Maybe<Blog_Blog_Tags_Var_Pop_Fields>
  var_samp?: Maybe<Blog_Blog_Tags_Var_Samp_Fields>
  variance?: Maybe<Blog_Blog_Tags_Variance_Fields>
}

/** aggregate fields of "blog_blog_tags" */
export type Blog_Blog_Tags_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Blog_Blog_Tags_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']>
}

/** order by aggregate values of table "blog_blog_tags" */
export type Blog_Blog_Tags_Aggregate_Order_By = {
  avg?: InputMaybe<Blog_Blog_Tags_Avg_Order_By>
  count?: InputMaybe<Order_By>
  max?: InputMaybe<Blog_Blog_Tags_Max_Order_By>
  min?: InputMaybe<Blog_Blog_Tags_Min_Order_By>
  stddev?: InputMaybe<Blog_Blog_Tags_Stddev_Order_By>
  stddev_pop?: InputMaybe<Blog_Blog_Tags_Stddev_Pop_Order_By>
  stddev_samp?: InputMaybe<Blog_Blog_Tags_Stddev_Samp_Order_By>
  sum?: InputMaybe<Blog_Blog_Tags_Sum_Order_By>
  var_pop?: InputMaybe<Blog_Blog_Tags_Var_Pop_Order_By>
  var_samp?: InputMaybe<Blog_Blog_Tags_Var_Samp_Order_By>
  variance?: InputMaybe<Blog_Blog_Tags_Variance_Order_By>
}

/** input type for inserting array relation for remote table "blog_blog_tags" */
export type Blog_Blog_Tags_Arr_Rel_Insert_Input = {
  data: Array<Blog_Blog_Tags_Insert_Input>
  /** upsert condition */
  on_conflict?: InputMaybe<Blog_Blog_Tags_On_Conflict>
}

/** aggregate avg on columns */
export type Blog_Blog_Tags_Avg_Fields = {
  __typename?: 'blog_blog_tags_avg_fields'
  blog_id?: Maybe<Scalars['Float']>
  blog_tag_id?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
}

/** order by avg() on columns of table "blog_blog_tags" */
export type Blog_Blog_Tags_Avg_Order_By = {
  blog_id?: InputMaybe<Order_By>
  blog_tag_id?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
}

/** Boolean expression to filter rows from the table "blog_blog_tags". All fields are combined with a logical 'AND'. */
export type Blog_Blog_Tags_Bool_Exp = {
  _and?: InputMaybe<Array<Blog_Blog_Tags_Bool_Exp>>
  _not?: InputMaybe<Blog_Blog_Tags_Bool_Exp>
  _or?: InputMaybe<Array<Blog_Blog_Tags_Bool_Exp>>
  blog?: InputMaybe<Blogs_Bool_Exp>
  blog_id?: InputMaybe<Int_Comparison_Exp>
  blog_tag?: InputMaybe<Blog_Tags_Bool_Exp>
  blog_tag_id?: InputMaybe<Int_Comparison_Exp>
  id?: InputMaybe<Int_Comparison_Exp>
}

/** unique or primary key constraints on table "blog_blog_tags" */
export enum Blog_Blog_Tags_Constraint {
  /** unique or primary key constraint on columns "blog_id", "blog_tag_id", "id" */
  BlogBlogTagsBlogIdBlogTagIdIdKey = 'blog_blog_tags_blog_id_blog_tag_id_id_key',
  /** unique or primary key constraint on columns "id" */
  BlogBlogTagsPkey = 'blog_blog_tags_pkey',
}

/** input type for incrementing numeric columns in table "blog_blog_tags" */
export type Blog_Blog_Tags_Inc_Input = {
  blog_id?: InputMaybe<Scalars['Int']>
  blog_tag_id?: InputMaybe<Scalars['Int']>
  id?: InputMaybe<Scalars['Int']>
}

/** input type for inserting data into table "blog_blog_tags" */
export type Blog_Blog_Tags_Insert_Input = {
  blog?: InputMaybe<Blogs_Obj_Rel_Insert_Input>
  blog_id?: InputMaybe<Scalars['Int']>
  blog_tag?: InputMaybe<Blog_Tags_Obj_Rel_Insert_Input>
  blog_tag_id?: InputMaybe<Scalars['Int']>
  id?: InputMaybe<Scalars['Int']>
}

/** aggregate max on columns */
export type Blog_Blog_Tags_Max_Fields = {
  __typename?: 'blog_blog_tags_max_fields'
  blog_id?: Maybe<Scalars['Int']>
  blog_tag_id?: Maybe<Scalars['Int']>
  id?: Maybe<Scalars['Int']>
}

/** order by max() on columns of table "blog_blog_tags" */
export type Blog_Blog_Tags_Max_Order_By = {
  blog_id?: InputMaybe<Order_By>
  blog_tag_id?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
}

/** aggregate min on columns */
export type Blog_Blog_Tags_Min_Fields = {
  __typename?: 'blog_blog_tags_min_fields'
  blog_id?: Maybe<Scalars['Int']>
  blog_tag_id?: Maybe<Scalars['Int']>
  id?: Maybe<Scalars['Int']>
}

/** order by min() on columns of table "blog_blog_tags" */
export type Blog_Blog_Tags_Min_Order_By = {
  blog_id?: InputMaybe<Order_By>
  blog_tag_id?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
}

/** response of any mutation on the table "blog_blog_tags" */
export type Blog_Blog_Tags_Mutation_Response = {
  __typename?: 'blog_blog_tags_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Blog_Blog_Tags>
}

/** on_conflict condition type for table "blog_blog_tags" */
export type Blog_Blog_Tags_On_Conflict = {
  constraint: Blog_Blog_Tags_Constraint
  update_columns?: Array<Blog_Blog_Tags_Update_Column>
  where?: InputMaybe<Blog_Blog_Tags_Bool_Exp>
}

/** Ordering options when selecting data from "blog_blog_tags". */
export type Blog_Blog_Tags_Order_By = {
  blog?: InputMaybe<Blogs_Order_By>
  blog_id?: InputMaybe<Order_By>
  blog_tag?: InputMaybe<Blog_Tags_Order_By>
  blog_tag_id?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
}

/** primary key columns input for table: blog_blog_tags */
export type Blog_Blog_Tags_Pk_Columns_Input = {
  id: Scalars['Int']
}

/** select columns of table "blog_blog_tags" */
export enum Blog_Blog_Tags_Select_Column {
  /** column name */
  BlogId = 'blog_id',
  /** column name */
  BlogTagId = 'blog_tag_id',
  /** column name */
  Id = 'id',
}

/** input type for updating data in table "blog_blog_tags" */
export type Blog_Blog_Tags_Set_Input = {
  blog_id?: InputMaybe<Scalars['Int']>
  blog_tag_id?: InputMaybe<Scalars['Int']>
  id?: InputMaybe<Scalars['Int']>
}

/** aggregate stddev on columns */
export type Blog_Blog_Tags_Stddev_Fields = {
  __typename?: 'blog_blog_tags_stddev_fields'
  blog_id?: Maybe<Scalars['Float']>
  blog_tag_id?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
}

/** order by stddev() on columns of table "blog_blog_tags" */
export type Blog_Blog_Tags_Stddev_Order_By = {
  blog_id?: InputMaybe<Order_By>
  blog_tag_id?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
}

/** aggregate stddev_pop on columns */
export type Blog_Blog_Tags_Stddev_Pop_Fields = {
  __typename?: 'blog_blog_tags_stddev_pop_fields'
  blog_id?: Maybe<Scalars['Float']>
  blog_tag_id?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
}

/** order by stddev_pop() on columns of table "blog_blog_tags" */
export type Blog_Blog_Tags_Stddev_Pop_Order_By = {
  blog_id?: InputMaybe<Order_By>
  blog_tag_id?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
}

/** aggregate stddev_samp on columns */
export type Blog_Blog_Tags_Stddev_Samp_Fields = {
  __typename?: 'blog_blog_tags_stddev_samp_fields'
  blog_id?: Maybe<Scalars['Float']>
  blog_tag_id?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
}

/** order by stddev_samp() on columns of table "blog_blog_tags" */
export type Blog_Blog_Tags_Stddev_Samp_Order_By = {
  blog_id?: InputMaybe<Order_By>
  blog_tag_id?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
}

/** Streaming cursor of the table "blog_blog_tags" */
export type Blog_Blog_Tags_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Blog_Blog_Tags_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Blog_Blog_Tags_Stream_Cursor_Value_Input = {
  blog_id?: InputMaybe<Scalars['Int']>
  blog_tag_id?: InputMaybe<Scalars['Int']>
  id?: InputMaybe<Scalars['Int']>
}

/** aggregate sum on columns */
export type Blog_Blog_Tags_Sum_Fields = {
  __typename?: 'blog_blog_tags_sum_fields'
  blog_id?: Maybe<Scalars['Int']>
  blog_tag_id?: Maybe<Scalars['Int']>
  id?: Maybe<Scalars['Int']>
}

/** order by sum() on columns of table "blog_blog_tags" */
export type Blog_Blog_Tags_Sum_Order_By = {
  blog_id?: InputMaybe<Order_By>
  blog_tag_id?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
}

/** update columns of table "blog_blog_tags" */
export enum Blog_Blog_Tags_Update_Column {
  /** column name */
  BlogId = 'blog_id',
  /** column name */
  BlogTagId = 'blog_tag_id',
  /** column name */
  Id = 'id',
}

export type Blog_Blog_Tags_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Blog_Blog_Tags_Inc_Input>
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Blog_Blog_Tags_Set_Input>
  where: Blog_Blog_Tags_Bool_Exp
}

/** aggregate var_pop on columns */
export type Blog_Blog_Tags_Var_Pop_Fields = {
  __typename?: 'blog_blog_tags_var_pop_fields'
  blog_id?: Maybe<Scalars['Float']>
  blog_tag_id?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
}

/** order by var_pop() on columns of table "blog_blog_tags" */
export type Blog_Blog_Tags_Var_Pop_Order_By = {
  blog_id?: InputMaybe<Order_By>
  blog_tag_id?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
}

/** aggregate var_samp on columns */
export type Blog_Blog_Tags_Var_Samp_Fields = {
  __typename?: 'blog_blog_tags_var_samp_fields'
  blog_id?: Maybe<Scalars['Float']>
  blog_tag_id?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
}

/** order by var_samp() on columns of table "blog_blog_tags" */
export type Blog_Blog_Tags_Var_Samp_Order_By = {
  blog_id?: InputMaybe<Order_By>
  blog_tag_id?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
}

/** aggregate variance on columns */
export type Blog_Blog_Tags_Variance_Fields = {
  __typename?: 'blog_blog_tags_variance_fields'
  blog_id?: Maybe<Scalars['Float']>
  blog_tag_id?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
}

/** order by variance() on columns of table "blog_blog_tags" */
export type Blog_Blog_Tags_Variance_Order_By = {
  blog_id?: InputMaybe<Order_By>
  blog_tag_id?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
}

/** columns and relationships of "blog_comments" */
export type Blog_Comments = {
  __typename?: 'blog_comments'
  /** An object relationship */
  blog: Blogs
  /** An object relationship */
  blog_comment?: Maybe<Blog_Comments>
  /** An array relationship */
  blog_comments: Array<Blog_Comments>
  /** An aggregate relationship */
  blog_comments_aggregate: Blog_Comments_Aggregate
  blog_id: Scalars['Int']
  comment: Scalars['String']
  created_at: Scalars['timestamp']
  deleted_at?: Maybe<Scalars['time']>
  id: Scalars['Int']
  parent_comment_id?: Maybe<Scalars['Int']>
  updated_at: Scalars['timestamp']
  /** An object relationship */
  user: Users
  user_id: Scalars['Int']
}

/** columns and relationships of "blog_comments" */
export type Blog_CommentsBlog_CommentsArgs = {
  distinct_on?: InputMaybe<Array<Blog_Comments_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Blog_Comments_Order_By>>
  where?: InputMaybe<Blog_Comments_Bool_Exp>
}

/** columns and relationships of "blog_comments" */
export type Blog_CommentsBlog_Comments_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Blog_Comments_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Blog_Comments_Order_By>>
  where?: InputMaybe<Blog_Comments_Bool_Exp>
}

/** aggregated selection of "blog_comments" */
export type Blog_Comments_Aggregate = {
  __typename?: 'blog_comments_aggregate'
  aggregate?: Maybe<Blog_Comments_Aggregate_Fields>
  nodes: Array<Blog_Comments>
}

export type Blog_Comments_Aggregate_Bool_Exp = {
  count?: InputMaybe<Blog_Comments_Aggregate_Bool_Exp_Count>
}

export type Blog_Comments_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Blog_Comments_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']>
  filter?: InputMaybe<Blog_Comments_Bool_Exp>
  predicate: Int_Comparison_Exp
}

/** aggregate fields of "blog_comments" */
export type Blog_Comments_Aggregate_Fields = {
  __typename?: 'blog_comments_aggregate_fields'
  avg?: Maybe<Blog_Comments_Avg_Fields>
  count: Scalars['Int']
  max?: Maybe<Blog_Comments_Max_Fields>
  min?: Maybe<Blog_Comments_Min_Fields>
  stddev?: Maybe<Blog_Comments_Stddev_Fields>
  stddev_pop?: Maybe<Blog_Comments_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Blog_Comments_Stddev_Samp_Fields>
  sum?: Maybe<Blog_Comments_Sum_Fields>
  var_pop?: Maybe<Blog_Comments_Var_Pop_Fields>
  var_samp?: Maybe<Blog_Comments_Var_Samp_Fields>
  variance?: Maybe<Blog_Comments_Variance_Fields>
}

/** aggregate fields of "blog_comments" */
export type Blog_Comments_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Blog_Comments_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']>
}

/** order by aggregate values of table "blog_comments" */
export type Blog_Comments_Aggregate_Order_By = {
  avg?: InputMaybe<Blog_Comments_Avg_Order_By>
  count?: InputMaybe<Order_By>
  max?: InputMaybe<Blog_Comments_Max_Order_By>
  min?: InputMaybe<Blog_Comments_Min_Order_By>
  stddev?: InputMaybe<Blog_Comments_Stddev_Order_By>
  stddev_pop?: InputMaybe<Blog_Comments_Stddev_Pop_Order_By>
  stddev_samp?: InputMaybe<Blog_Comments_Stddev_Samp_Order_By>
  sum?: InputMaybe<Blog_Comments_Sum_Order_By>
  var_pop?: InputMaybe<Blog_Comments_Var_Pop_Order_By>
  var_samp?: InputMaybe<Blog_Comments_Var_Samp_Order_By>
  variance?: InputMaybe<Blog_Comments_Variance_Order_By>
}

/** input type for inserting array relation for remote table "blog_comments" */
export type Blog_Comments_Arr_Rel_Insert_Input = {
  data: Array<Blog_Comments_Insert_Input>
  /** upsert condition */
  on_conflict?: InputMaybe<Blog_Comments_On_Conflict>
}

/** aggregate avg on columns */
export type Blog_Comments_Avg_Fields = {
  __typename?: 'blog_comments_avg_fields'
  blog_id?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
  parent_comment_id?: Maybe<Scalars['Float']>
  user_id?: Maybe<Scalars['Float']>
}

/** order by avg() on columns of table "blog_comments" */
export type Blog_Comments_Avg_Order_By = {
  blog_id?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  parent_comment_id?: InputMaybe<Order_By>
  user_id?: InputMaybe<Order_By>
}

/** Boolean expression to filter rows from the table "blog_comments". All fields are combined with a logical 'AND'. */
export type Blog_Comments_Bool_Exp = {
  _and?: InputMaybe<Array<Blog_Comments_Bool_Exp>>
  _not?: InputMaybe<Blog_Comments_Bool_Exp>
  _or?: InputMaybe<Array<Blog_Comments_Bool_Exp>>
  blog?: InputMaybe<Blogs_Bool_Exp>
  blog_comment?: InputMaybe<Blog_Comments_Bool_Exp>
  blog_comments?: InputMaybe<Blog_Comments_Bool_Exp>
  blog_comments_aggregate?: InputMaybe<Blog_Comments_Aggregate_Bool_Exp>
  blog_id?: InputMaybe<Int_Comparison_Exp>
  comment?: InputMaybe<String_Comparison_Exp>
  created_at?: InputMaybe<Timestamp_Comparison_Exp>
  deleted_at?: InputMaybe<Time_Comparison_Exp>
  id?: InputMaybe<Int_Comparison_Exp>
  parent_comment_id?: InputMaybe<Int_Comparison_Exp>
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>
  user?: InputMaybe<Users_Bool_Exp>
  user_id?: InputMaybe<Int_Comparison_Exp>
}

/** unique or primary key constraints on table "blog_comments" */
export enum Blog_Comments_Constraint {
  /** unique or primary key constraint on columns "id" */
  BlogCommentsPkey = 'blog_comments_pkey',
}

/** input type for incrementing numeric columns in table "blog_comments" */
export type Blog_Comments_Inc_Input = {
  blog_id?: InputMaybe<Scalars['Int']>
  id?: InputMaybe<Scalars['Int']>
  parent_comment_id?: InputMaybe<Scalars['Int']>
  user_id?: InputMaybe<Scalars['Int']>
}

/** input type for inserting data into table "blog_comments" */
export type Blog_Comments_Insert_Input = {
  blog?: InputMaybe<Blogs_Obj_Rel_Insert_Input>
  blog_comment?: InputMaybe<Blog_Comments_Obj_Rel_Insert_Input>
  blog_comments?: InputMaybe<Blog_Comments_Arr_Rel_Insert_Input>
  blog_id?: InputMaybe<Scalars['Int']>
  comment?: InputMaybe<Scalars['String']>
  created_at?: InputMaybe<Scalars['timestamp']>
  deleted_at?: InputMaybe<Scalars['time']>
  id?: InputMaybe<Scalars['Int']>
  parent_comment_id?: InputMaybe<Scalars['Int']>
  updated_at?: InputMaybe<Scalars['timestamp']>
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>
  user_id?: InputMaybe<Scalars['Int']>
}

/** aggregate max on columns */
export type Blog_Comments_Max_Fields = {
  __typename?: 'blog_comments_max_fields'
  blog_id?: Maybe<Scalars['Int']>
  comment?: Maybe<Scalars['String']>
  created_at?: Maybe<Scalars['timestamp']>
  id?: Maybe<Scalars['Int']>
  parent_comment_id?: Maybe<Scalars['Int']>
  updated_at?: Maybe<Scalars['timestamp']>
  user_id?: Maybe<Scalars['Int']>
}

/** order by max() on columns of table "blog_comments" */
export type Blog_Comments_Max_Order_By = {
  blog_id?: InputMaybe<Order_By>
  comment?: InputMaybe<Order_By>
  created_at?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  parent_comment_id?: InputMaybe<Order_By>
  updated_at?: InputMaybe<Order_By>
  user_id?: InputMaybe<Order_By>
}

/** aggregate min on columns */
export type Blog_Comments_Min_Fields = {
  __typename?: 'blog_comments_min_fields'
  blog_id?: Maybe<Scalars['Int']>
  comment?: Maybe<Scalars['String']>
  created_at?: Maybe<Scalars['timestamp']>
  id?: Maybe<Scalars['Int']>
  parent_comment_id?: Maybe<Scalars['Int']>
  updated_at?: Maybe<Scalars['timestamp']>
  user_id?: Maybe<Scalars['Int']>
}

/** order by min() on columns of table "blog_comments" */
export type Blog_Comments_Min_Order_By = {
  blog_id?: InputMaybe<Order_By>
  comment?: InputMaybe<Order_By>
  created_at?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  parent_comment_id?: InputMaybe<Order_By>
  updated_at?: InputMaybe<Order_By>
  user_id?: InputMaybe<Order_By>
}

/** response of any mutation on the table "blog_comments" */
export type Blog_Comments_Mutation_Response = {
  __typename?: 'blog_comments_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Blog_Comments>
}

/** input type for inserting object relation for remote table "blog_comments" */
export type Blog_Comments_Obj_Rel_Insert_Input = {
  data: Blog_Comments_Insert_Input
  /** upsert condition */
  on_conflict?: InputMaybe<Blog_Comments_On_Conflict>
}

/** on_conflict condition type for table "blog_comments" */
export type Blog_Comments_On_Conflict = {
  constraint: Blog_Comments_Constraint
  update_columns?: Array<Blog_Comments_Update_Column>
  where?: InputMaybe<Blog_Comments_Bool_Exp>
}

/** Ordering options when selecting data from "blog_comments". */
export type Blog_Comments_Order_By = {
  blog?: InputMaybe<Blogs_Order_By>
  blog_comment?: InputMaybe<Blog_Comments_Order_By>
  blog_comments_aggregate?: InputMaybe<Blog_Comments_Aggregate_Order_By>
  blog_id?: InputMaybe<Order_By>
  comment?: InputMaybe<Order_By>
  created_at?: InputMaybe<Order_By>
  deleted_at?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  parent_comment_id?: InputMaybe<Order_By>
  updated_at?: InputMaybe<Order_By>
  user?: InputMaybe<Users_Order_By>
  user_id?: InputMaybe<Order_By>
}

/** primary key columns input for table: blog_comments */
export type Blog_Comments_Pk_Columns_Input = {
  id: Scalars['Int']
}

/** select columns of table "blog_comments" */
export enum Blog_Comments_Select_Column {
  /** column name */
  BlogId = 'blog_id',
  /** column name */
  Comment = 'comment',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  Id = 'id',
  /** column name */
  ParentCommentId = 'parent_comment_id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id',
}

/** input type for updating data in table "blog_comments" */
export type Blog_Comments_Set_Input = {
  blog_id?: InputMaybe<Scalars['Int']>
  comment?: InputMaybe<Scalars['String']>
  created_at?: InputMaybe<Scalars['timestamp']>
  deleted_at?: InputMaybe<Scalars['time']>
  id?: InputMaybe<Scalars['Int']>
  parent_comment_id?: InputMaybe<Scalars['Int']>
  updated_at?: InputMaybe<Scalars['timestamp']>
  user_id?: InputMaybe<Scalars['Int']>
}

/** aggregate stddev on columns */
export type Blog_Comments_Stddev_Fields = {
  __typename?: 'blog_comments_stddev_fields'
  blog_id?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
  parent_comment_id?: Maybe<Scalars['Float']>
  user_id?: Maybe<Scalars['Float']>
}

/** order by stddev() on columns of table "blog_comments" */
export type Blog_Comments_Stddev_Order_By = {
  blog_id?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  parent_comment_id?: InputMaybe<Order_By>
  user_id?: InputMaybe<Order_By>
}

/** aggregate stddev_pop on columns */
export type Blog_Comments_Stddev_Pop_Fields = {
  __typename?: 'blog_comments_stddev_pop_fields'
  blog_id?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
  parent_comment_id?: Maybe<Scalars['Float']>
  user_id?: Maybe<Scalars['Float']>
}

/** order by stddev_pop() on columns of table "blog_comments" */
export type Blog_Comments_Stddev_Pop_Order_By = {
  blog_id?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  parent_comment_id?: InputMaybe<Order_By>
  user_id?: InputMaybe<Order_By>
}

/** aggregate stddev_samp on columns */
export type Blog_Comments_Stddev_Samp_Fields = {
  __typename?: 'blog_comments_stddev_samp_fields'
  blog_id?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
  parent_comment_id?: Maybe<Scalars['Float']>
  user_id?: Maybe<Scalars['Float']>
}

/** order by stddev_samp() on columns of table "blog_comments" */
export type Blog_Comments_Stddev_Samp_Order_By = {
  blog_id?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  parent_comment_id?: InputMaybe<Order_By>
  user_id?: InputMaybe<Order_By>
}

/** Streaming cursor of the table "blog_comments" */
export type Blog_Comments_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Blog_Comments_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Blog_Comments_Stream_Cursor_Value_Input = {
  blog_id?: InputMaybe<Scalars['Int']>
  comment?: InputMaybe<Scalars['String']>
  created_at?: InputMaybe<Scalars['timestamp']>
  deleted_at?: InputMaybe<Scalars['time']>
  id?: InputMaybe<Scalars['Int']>
  parent_comment_id?: InputMaybe<Scalars['Int']>
  updated_at?: InputMaybe<Scalars['timestamp']>
  user_id?: InputMaybe<Scalars['Int']>
}

/** aggregate sum on columns */
export type Blog_Comments_Sum_Fields = {
  __typename?: 'blog_comments_sum_fields'
  blog_id?: Maybe<Scalars['Int']>
  id?: Maybe<Scalars['Int']>
  parent_comment_id?: Maybe<Scalars['Int']>
  user_id?: Maybe<Scalars['Int']>
}

/** order by sum() on columns of table "blog_comments" */
export type Blog_Comments_Sum_Order_By = {
  blog_id?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  parent_comment_id?: InputMaybe<Order_By>
  user_id?: InputMaybe<Order_By>
}

/** update columns of table "blog_comments" */
export enum Blog_Comments_Update_Column {
  /** column name */
  BlogId = 'blog_id',
  /** column name */
  Comment = 'comment',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeletedAt = 'deleted_at',
  /** column name */
  Id = 'id',
  /** column name */
  ParentCommentId = 'parent_comment_id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id',
}

export type Blog_Comments_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Blog_Comments_Inc_Input>
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Blog_Comments_Set_Input>
  where: Blog_Comments_Bool_Exp
}

/** aggregate var_pop on columns */
export type Blog_Comments_Var_Pop_Fields = {
  __typename?: 'blog_comments_var_pop_fields'
  blog_id?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
  parent_comment_id?: Maybe<Scalars['Float']>
  user_id?: Maybe<Scalars['Float']>
}

/** order by var_pop() on columns of table "blog_comments" */
export type Blog_Comments_Var_Pop_Order_By = {
  blog_id?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  parent_comment_id?: InputMaybe<Order_By>
  user_id?: InputMaybe<Order_By>
}

/** aggregate var_samp on columns */
export type Blog_Comments_Var_Samp_Fields = {
  __typename?: 'blog_comments_var_samp_fields'
  blog_id?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
  parent_comment_id?: Maybe<Scalars['Float']>
  user_id?: Maybe<Scalars['Float']>
}

/** order by var_samp() on columns of table "blog_comments" */
export type Blog_Comments_Var_Samp_Order_By = {
  blog_id?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  parent_comment_id?: InputMaybe<Order_By>
  user_id?: InputMaybe<Order_By>
}

/** aggregate variance on columns */
export type Blog_Comments_Variance_Fields = {
  __typename?: 'blog_comments_variance_fields'
  blog_id?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
  parent_comment_id?: Maybe<Scalars['Float']>
  user_id?: Maybe<Scalars['Float']>
}

/** order by variance() on columns of table "blog_comments" */
export type Blog_Comments_Variance_Order_By = {
  blog_id?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  parent_comment_id?: InputMaybe<Order_By>
  user_id?: InputMaybe<Order_By>
}

/** columns and relationships of "blog_tags" */
export type Blog_Tags = {
  __typename?: 'blog_tags'
  /** An array relationship */
  blog_blog_tags: Array<Blog_Blog_Tags>
  /** An aggregate relationship */
  blog_blog_tags_aggregate: Blog_Blog_Tags_Aggregate
  id: Scalars['Int']
  name: Scalars['String']
  slug: Scalars['String']
}

/** columns and relationships of "blog_tags" */
export type Blog_TagsBlog_Blog_TagsArgs = {
  distinct_on?: InputMaybe<Array<Blog_Blog_Tags_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Blog_Blog_Tags_Order_By>>
  where?: InputMaybe<Blog_Blog_Tags_Bool_Exp>
}

/** columns and relationships of "blog_tags" */
export type Blog_TagsBlog_Blog_Tags_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Blog_Blog_Tags_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Blog_Blog_Tags_Order_By>>
  where?: InputMaybe<Blog_Blog_Tags_Bool_Exp>
}

/** aggregated selection of "blog_tags" */
export type Blog_Tags_Aggregate = {
  __typename?: 'blog_tags_aggregate'
  aggregate?: Maybe<Blog_Tags_Aggregate_Fields>
  nodes: Array<Blog_Tags>
}

/** aggregate fields of "blog_tags" */
export type Blog_Tags_Aggregate_Fields = {
  __typename?: 'blog_tags_aggregate_fields'
  avg?: Maybe<Blog_Tags_Avg_Fields>
  count: Scalars['Int']
  max?: Maybe<Blog_Tags_Max_Fields>
  min?: Maybe<Blog_Tags_Min_Fields>
  stddev?: Maybe<Blog_Tags_Stddev_Fields>
  stddev_pop?: Maybe<Blog_Tags_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Blog_Tags_Stddev_Samp_Fields>
  sum?: Maybe<Blog_Tags_Sum_Fields>
  var_pop?: Maybe<Blog_Tags_Var_Pop_Fields>
  var_samp?: Maybe<Blog_Tags_Var_Samp_Fields>
  variance?: Maybe<Blog_Tags_Variance_Fields>
}

/** aggregate fields of "blog_tags" */
export type Blog_Tags_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Blog_Tags_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']>
}

/** aggregate avg on columns */
export type Blog_Tags_Avg_Fields = {
  __typename?: 'blog_tags_avg_fields'
  id?: Maybe<Scalars['Float']>
}

/** Boolean expression to filter rows from the table "blog_tags". All fields are combined with a logical 'AND'. */
export type Blog_Tags_Bool_Exp = {
  _and?: InputMaybe<Array<Blog_Tags_Bool_Exp>>
  _not?: InputMaybe<Blog_Tags_Bool_Exp>
  _or?: InputMaybe<Array<Blog_Tags_Bool_Exp>>
  blog_blog_tags?: InputMaybe<Blog_Blog_Tags_Bool_Exp>
  blog_blog_tags_aggregate?: InputMaybe<Blog_Blog_Tags_Aggregate_Bool_Exp>
  id?: InputMaybe<Int_Comparison_Exp>
  name?: InputMaybe<String_Comparison_Exp>
  slug?: InputMaybe<String_Comparison_Exp>
}

/** unique or primary key constraints on table "blog_tags" */
export enum Blog_Tags_Constraint {
  /** unique or primary key constraint on columns "id" */
  BlogTagsIdKey = 'blog_tags_id_key',
  /** unique or primary key constraint on columns "name" */
  BlogTagsNameKey = 'blog_tags_name_key',
  /** unique or primary key constraint on columns "id" */
  BlogTagsPkey = 'blog_tags_pkey',
  /** unique or primary key constraint on columns "slug" */
  BlogTagsSlugKey = 'blog_tags_slug_key',
}

/** input type for incrementing numeric columns in table "blog_tags" */
export type Blog_Tags_Inc_Input = {
  id?: InputMaybe<Scalars['Int']>
}

/** input type for inserting data into table "blog_tags" */
export type Blog_Tags_Insert_Input = {
  blog_blog_tags?: InputMaybe<Blog_Blog_Tags_Arr_Rel_Insert_Input>
  id?: InputMaybe<Scalars['Int']>
  name?: InputMaybe<Scalars['String']>
  slug?: InputMaybe<Scalars['String']>
}

/** aggregate max on columns */
export type Blog_Tags_Max_Fields = {
  __typename?: 'blog_tags_max_fields'
  id?: Maybe<Scalars['Int']>
  name?: Maybe<Scalars['String']>
  slug?: Maybe<Scalars['String']>
}

/** aggregate min on columns */
export type Blog_Tags_Min_Fields = {
  __typename?: 'blog_tags_min_fields'
  id?: Maybe<Scalars['Int']>
  name?: Maybe<Scalars['String']>
  slug?: Maybe<Scalars['String']>
}

/** response of any mutation on the table "blog_tags" */
export type Blog_Tags_Mutation_Response = {
  __typename?: 'blog_tags_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Blog_Tags>
}

/** input type for inserting object relation for remote table "blog_tags" */
export type Blog_Tags_Obj_Rel_Insert_Input = {
  data: Blog_Tags_Insert_Input
  /** upsert condition */
  on_conflict?: InputMaybe<Blog_Tags_On_Conflict>
}

/** on_conflict condition type for table "blog_tags" */
export type Blog_Tags_On_Conflict = {
  constraint: Blog_Tags_Constraint
  update_columns?: Array<Blog_Tags_Update_Column>
  where?: InputMaybe<Blog_Tags_Bool_Exp>
}

/** Ordering options when selecting data from "blog_tags". */
export type Blog_Tags_Order_By = {
  blog_blog_tags_aggregate?: InputMaybe<Blog_Blog_Tags_Aggregate_Order_By>
  id?: InputMaybe<Order_By>
  name?: InputMaybe<Order_By>
  slug?: InputMaybe<Order_By>
}

/** primary key columns input for table: blog_tags */
export type Blog_Tags_Pk_Columns_Input = {
  id: Scalars['Int']
}

/** select columns of table "blog_tags" */
export enum Blog_Tags_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Slug = 'slug',
}

/** input type for updating data in table "blog_tags" */
export type Blog_Tags_Set_Input = {
  id?: InputMaybe<Scalars['Int']>
  name?: InputMaybe<Scalars['String']>
  slug?: InputMaybe<Scalars['String']>
}

/** aggregate stddev on columns */
export type Blog_Tags_Stddev_Fields = {
  __typename?: 'blog_tags_stddev_fields'
  id?: Maybe<Scalars['Float']>
}

/** aggregate stddev_pop on columns */
export type Blog_Tags_Stddev_Pop_Fields = {
  __typename?: 'blog_tags_stddev_pop_fields'
  id?: Maybe<Scalars['Float']>
}

/** aggregate stddev_samp on columns */
export type Blog_Tags_Stddev_Samp_Fields = {
  __typename?: 'blog_tags_stddev_samp_fields'
  id?: Maybe<Scalars['Float']>
}

/** Streaming cursor of the table "blog_tags" */
export type Blog_Tags_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Blog_Tags_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Blog_Tags_Stream_Cursor_Value_Input = {
  id?: InputMaybe<Scalars['Int']>
  name?: InputMaybe<Scalars['String']>
  slug?: InputMaybe<Scalars['String']>
}

/** aggregate sum on columns */
export type Blog_Tags_Sum_Fields = {
  __typename?: 'blog_tags_sum_fields'
  id?: Maybe<Scalars['Int']>
}

/** update columns of table "blog_tags" */
export enum Blog_Tags_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Slug = 'slug',
}

export type Blog_Tags_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Blog_Tags_Inc_Input>
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Blog_Tags_Set_Input>
  where: Blog_Tags_Bool_Exp
}

/** aggregate var_pop on columns */
export type Blog_Tags_Var_Pop_Fields = {
  __typename?: 'blog_tags_var_pop_fields'
  id?: Maybe<Scalars['Float']>
}

/** aggregate var_samp on columns */
export type Blog_Tags_Var_Samp_Fields = {
  __typename?: 'blog_tags_var_samp_fields'
  id?: Maybe<Scalars['Float']>
}

/** aggregate variance on columns */
export type Blog_Tags_Variance_Fields = {
  __typename?: 'blog_tags_variance_fields'
  id?: Maybe<Scalars['Float']>
}

/** ブログの投稿テーブル */
export type Blogs = {
  __typename?: 'blogs'
  /** An array relationship */
  blog_blog_tags: Array<Blog_Blog_Tags>
  /** An aggregate relationship */
  blog_blog_tags_aggregate: Blog_Blog_Tags_Aggregate
  /** An array relationship */
  blog_comments: Array<Blog_Comments>
  /** An aggregate relationship */
  blog_comments_aggregate: Blog_Comments_Aggregate
  contents?: Maybe<Scalars['String']>
  created_at: Scalars['timestamptz']
  id: Scalars['Int']
  slug: Scalars['String']
  thumbnail?: Maybe<Scalars['String']>
  title: Scalars['String']
  updated_at: Scalars['timestamptz']
}

/** ブログの投稿テーブル */
export type BlogsBlog_Blog_TagsArgs = {
  distinct_on?: InputMaybe<Array<Blog_Blog_Tags_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Blog_Blog_Tags_Order_By>>
  where?: InputMaybe<Blog_Blog_Tags_Bool_Exp>
}

/** ブログの投稿テーブル */
export type BlogsBlog_Blog_Tags_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Blog_Blog_Tags_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Blog_Blog_Tags_Order_By>>
  where?: InputMaybe<Blog_Blog_Tags_Bool_Exp>
}

/** ブログの投稿テーブル */
export type BlogsBlog_CommentsArgs = {
  distinct_on?: InputMaybe<Array<Blog_Comments_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Blog_Comments_Order_By>>
  where?: InputMaybe<Blog_Comments_Bool_Exp>
}

/** ブログの投稿テーブル */
export type BlogsBlog_Comments_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Blog_Comments_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Blog_Comments_Order_By>>
  where?: InputMaybe<Blog_Comments_Bool_Exp>
}

/** aggregated selection of "blogs" */
export type Blogs_Aggregate = {
  __typename?: 'blogs_aggregate'
  aggregate?: Maybe<Blogs_Aggregate_Fields>
  nodes: Array<Blogs>
}

/** aggregate fields of "blogs" */
export type Blogs_Aggregate_Fields = {
  __typename?: 'blogs_aggregate_fields'
  avg?: Maybe<Blogs_Avg_Fields>
  count: Scalars['Int']
  max?: Maybe<Blogs_Max_Fields>
  min?: Maybe<Blogs_Min_Fields>
  stddev?: Maybe<Blogs_Stddev_Fields>
  stddev_pop?: Maybe<Blogs_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Blogs_Stddev_Samp_Fields>
  sum?: Maybe<Blogs_Sum_Fields>
  var_pop?: Maybe<Blogs_Var_Pop_Fields>
  var_samp?: Maybe<Blogs_Var_Samp_Fields>
  variance?: Maybe<Blogs_Variance_Fields>
}

/** aggregate fields of "blogs" */
export type Blogs_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Blogs_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']>
}

/** aggregate avg on columns */
export type Blogs_Avg_Fields = {
  __typename?: 'blogs_avg_fields'
  id?: Maybe<Scalars['Float']>
}

/** Boolean expression to filter rows from the table "blogs". All fields are combined with a logical 'AND'. */
export type Blogs_Bool_Exp = {
  _and?: InputMaybe<Array<Blogs_Bool_Exp>>
  _not?: InputMaybe<Blogs_Bool_Exp>
  _or?: InputMaybe<Array<Blogs_Bool_Exp>>
  blog_blog_tags?: InputMaybe<Blog_Blog_Tags_Bool_Exp>
  blog_blog_tags_aggregate?: InputMaybe<Blog_Blog_Tags_Aggregate_Bool_Exp>
  blog_comments?: InputMaybe<Blog_Comments_Bool_Exp>
  blog_comments_aggregate?: InputMaybe<Blog_Comments_Aggregate_Bool_Exp>
  contents?: InputMaybe<String_Comparison_Exp>
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>
  id?: InputMaybe<Int_Comparison_Exp>
  slug?: InputMaybe<String_Comparison_Exp>
  thumbnail?: InputMaybe<String_Comparison_Exp>
  title?: InputMaybe<String_Comparison_Exp>
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>
}

/** unique or primary key constraints on table "blogs" */
export enum Blogs_Constraint {
  /** unique or primary key constraint on columns "id" */
  BlogPkey = 'blog_pkey',
  /** unique or primary key constraint on columns "id" */
  BlogsIdKey = 'blogs_id_key',
  /** unique or primary key constraint on columns "slug" */
  BlogsSlugKey = 'blogs_slug_key',
}

/** input type for incrementing numeric columns in table "blogs" */
export type Blogs_Inc_Input = {
  id?: InputMaybe<Scalars['Int']>
}

/** input type for inserting data into table "blogs" */
export type Blogs_Insert_Input = {
  blog_blog_tags?: InputMaybe<Blog_Blog_Tags_Arr_Rel_Insert_Input>
  blog_comments?: InputMaybe<Blog_Comments_Arr_Rel_Insert_Input>
  contents?: InputMaybe<Scalars['String']>
  created_at?: InputMaybe<Scalars['timestamptz']>
  id?: InputMaybe<Scalars['Int']>
  slug?: InputMaybe<Scalars['String']>
  thumbnail?: InputMaybe<Scalars['String']>
  title?: InputMaybe<Scalars['String']>
  updated_at?: InputMaybe<Scalars['timestamptz']>
}

/** aggregate max on columns */
export type Blogs_Max_Fields = {
  __typename?: 'blogs_max_fields'
  contents?: Maybe<Scalars['String']>
  created_at?: Maybe<Scalars['timestamptz']>
  id?: Maybe<Scalars['Int']>
  slug?: Maybe<Scalars['String']>
  thumbnail?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  updated_at?: Maybe<Scalars['timestamptz']>
}

/** aggregate min on columns */
export type Blogs_Min_Fields = {
  __typename?: 'blogs_min_fields'
  contents?: Maybe<Scalars['String']>
  created_at?: Maybe<Scalars['timestamptz']>
  id?: Maybe<Scalars['Int']>
  slug?: Maybe<Scalars['String']>
  thumbnail?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  updated_at?: Maybe<Scalars['timestamptz']>
}

/** response of any mutation on the table "blogs" */
export type Blogs_Mutation_Response = {
  __typename?: 'blogs_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Blogs>
}

/** input type for inserting object relation for remote table "blogs" */
export type Blogs_Obj_Rel_Insert_Input = {
  data: Blogs_Insert_Input
  /** upsert condition */
  on_conflict?: InputMaybe<Blogs_On_Conflict>
}

/** on_conflict condition type for table "blogs" */
export type Blogs_On_Conflict = {
  constraint: Blogs_Constraint
  update_columns?: Array<Blogs_Update_Column>
  where?: InputMaybe<Blogs_Bool_Exp>
}

/** Ordering options when selecting data from "blogs". */
export type Blogs_Order_By = {
  blog_blog_tags_aggregate?: InputMaybe<Blog_Blog_Tags_Aggregate_Order_By>
  blog_comments_aggregate?: InputMaybe<Blog_Comments_Aggregate_Order_By>
  contents?: InputMaybe<Order_By>
  created_at?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  slug?: InputMaybe<Order_By>
  thumbnail?: InputMaybe<Order_By>
  title?: InputMaybe<Order_By>
  updated_at?: InputMaybe<Order_By>
}

/** primary key columns input for table: blogs */
export type Blogs_Pk_Columns_Input = {
  id: Scalars['Int']
}

/** select columns of table "blogs" */
export enum Blogs_Select_Column {
  /** column name */
  Contents = 'contents',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Slug = 'slug',
  /** column name */
  Thumbnail = 'thumbnail',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at',
}

/** input type for updating data in table "blogs" */
export type Blogs_Set_Input = {
  contents?: InputMaybe<Scalars['String']>
  created_at?: InputMaybe<Scalars['timestamptz']>
  id?: InputMaybe<Scalars['Int']>
  slug?: InputMaybe<Scalars['String']>
  thumbnail?: InputMaybe<Scalars['String']>
  title?: InputMaybe<Scalars['String']>
  updated_at?: InputMaybe<Scalars['timestamptz']>
}

/** aggregate stddev on columns */
export type Blogs_Stddev_Fields = {
  __typename?: 'blogs_stddev_fields'
  id?: Maybe<Scalars['Float']>
}

/** aggregate stddev_pop on columns */
export type Blogs_Stddev_Pop_Fields = {
  __typename?: 'blogs_stddev_pop_fields'
  id?: Maybe<Scalars['Float']>
}

/** aggregate stddev_samp on columns */
export type Blogs_Stddev_Samp_Fields = {
  __typename?: 'blogs_stddev_samp_fields'
  id?: Maybe<Scalars['Float']>
}

/** Streaming cursor of the table "blogs" */
export type Blogs_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Blogs_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Blogs_Stream_Cursor_Value_Input = {
  contents?: InputMaybe<Scalars['String']>
  created_at?: InputMaybe<Scalars['timestamptz']>
  id?: InputMaybe<Scalars['Int']>
  slug?: InputMaybe<Scalars['String']>
  thumbnail?: InputMaybe<Scalars['String']>
  title?: InputMaybe<Scalars['String']>
  updated_at?: InputMaybe<Scalars['timestamptz']>
}

/** aggregate sum on columns */
export type Blogs_Sum_Fields = {
  __typename?: 'blogs_sum_fields'
  id?: Maybe<Scalars['Int']>
}

/** update columns of table "blogs" */
export enum Blogs_Update_Column {
  /** column name */
  Contents = 'contents',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Slug = 'slug',
  /** column name */
  Thumbnail = 'thumbnail',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at',
}

export type Blogs_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Blogs_Inc_Input>
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Blogs_Set_Input>
  where: Blogs_Bool_Exp
}

/** aggregate var_pop on columns */
export type Blogs_Var_Pop_Fields = {
  __typename?: 'blogs_var_pop_fields'
  id?: Maybe<Scalars['Float']>
}

/** aggregate var_samp on columns */
export type Blogs_Var_Samp_Fields = {
  __typename?: 'blogs_var_samp_fields'
  id?: Maybe<Scalars['Float']>
}

/** aggregate variance on columns */
export type Blogs_Variance_Fields = {
  __typename?: 'blogs_variance_fields'
  id?: Maybe<Scalars['Float']>
}

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC',
}

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root'
  /** delete data from the table: "blog_blog_tags" */
  delete_blog_blog_tags?: Maybe<Blog_Blog_Tags_Mutation_Response>
  /** delete single row from the table: "blog_blog_tags" */
  delete_blog_blog_tags_by_pk?: Maybe<Blog_Blog_Tags>
  /** delete data from the table: "blog_comments" */
  delete_blog_comments?: Maybe<Blog_Comments_Mutation_Response>
  /** delete single row from the table: "blog_comments" */
  delete_blog_comments_by_pk?: Maybe<Blog_Comments>
  /** delete data from the table: "blog_tags" */
  delete_blog_tags?: Maybe<Blog_Tags_Mutation_Response>
  /** delete single row from the table: "blog_tags" */
  delete_blog_tags_by_pk?: Maybe<Blog_Tags>
  /** delete data from the table: "blogs" */
  delete_blogs?: Maybe<Blogs_Mutation_Response>
  /** delete single row from the table: "blogs" */
  delete_blogs_by_pk?: Maybe<Blogs>
  /** delete data from the table: "users" */
  delete_users?: Maybe<Users_Mutation_Response>
  /** delete single row from the table: "users" */
  delete_users_by_pk?: Maybe<Users>
  /** insert data into the table: "blog_blog_tags" */
  insert_blog_blog_tags?: Maybe<Blog_Blog_Tags_Mutation_Response>
  /** insert a single row into the table: "blog_blog_tags" */
  insert_blog_blog_tags_one?: Maybe<Blog_Blog_Tags>
  /** insert data into the table: "blog_comments" */
  insert_blog_comments?: Maybe<Blog_Comments_Mutation_Response>
  /** insert a single row into the table: "blog_comments" */
  insert_blog_comments_one?: Maybe<Blog_Comments>
  /** insert data into the table: "blog_tags" */
  insert_blog_tags?: Maybe<Blog_Tags_Mutation_Response>
  /** insert a single row into the table: "blog_tags" */
  insert_blog_tags_one?: Maybe<Blog_Tags>
  /** insert data into the table: "blogs" */
  insert_blogs?: Maybe<Blogs_Mutation_Response>
  /** insert a single row into the table: "blogs" */
  insert_blogs_one?: Maybe<Blogs>
  /** insert data into the table: "users" */
  insert_users?: Maybe<Users_Mutation_Response>
  /** insert a single row into the table: "users" */
  insert_users_one?: Maybe<Users>
  /** update data of the table: "blog_blog_tags" */
  update_blog_blog_tags?: Maybe<Blog_Blog_Tags_Mutation_Response>
  /** update single row of the table: "blog_blog_tags" */
  update_blog_blog_tags_by_pk?: Maybe<Blog_Blog_Tags>
  /** update multiples rows of table: "blog_blog_tags" */
  update_blog_blog_tags_many?: Maybe<
    Array<Maybe<Blog_Blog_Tags_Mutation_Response>>
  >
  /** update data of the table: "blog_comments" */
  update_blog_comments?: Maybe<Blog_Comments_Mutation_Response>
  /** update single row of the table: "blog_comments" */
  update_blog_comments_by_pk?: Maybe<Blog_Comments>
  /** update multiples rows of table: "blog_comments" */
  update_blog_comments_many?: Maybe<
    Array<Maybe<Blog_Comments_Mutation_Response>>
  >
  /** update data of the table: "blog_tags" */
  update_blog_tags?: Maybe<Blog_Tags_Mutation_Response>
  /** update single row of the table: "blog_tags" */
  update_blog_tags_by_pk?: Maybe<Blog_Tags>
  /** update multiples rows of table: "blog_tags" */
  update_blog_tags_many?: Maybe<Array<Maybe<Blog_Tags_Mutation_Response>>>
  /** update data of the table: "blogs" */
  update_blogs?: Maybe<Blogs_Mutation_Response>
  /** update single row of the table: "blogs" */
  update_blogs_by_pk?: Maybe<Blogs>
  /** update multiples rows of table: "blogs" */
  update_blogs_many?: Maybe<Array<Maybe<Blogs_Mutation_Response>>>
  /** update data of the table: "users" */
  update_users?: Maybe<Users_Mutation_Response>
  /** update single row of the table: "users" */
  update_users_by_pk?: Maybe<Users>
  /** update multiples rows of table: "users" */
  update_users_many?: Maybe<Array<Maybe<Users_Mutation_Response>>>
}

/** mutation root */
export type Mutation_RootDelete_Blog_Blog_TagsArgs = {
  where: Blog_Blog_Tags_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Blog_Blog_Tags_By_PkArgs = {
  id: Scalars['Int']
}

/** mutation root */
export type Mutation_RootDelete_Blog_CommentsArgs = {
  where: Blog_Comments_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Blog_Comments_By_PkArgs = {
  id: Scalars['Int']
}

/** mutation root */
export type Mutation_RootDelete_Blog_TagsArgs = {
  where: Blog_Tags_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Blog_Tags_By_PkArgs = {
  id: Scalars['Int']
}

/** mutation root */
export type Mutation_RootDelete_BlogsArgs = {
  where: Blogs_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Blogs_By_PkArgs = {
  id: Scalars['Int']
}

/** mutation root */
export type Mutation_RootDelete_UsersArgs = {
  where: Users_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Users_By_PkArgs = {
  id: Scalars['Int']
}

/** mutation root */
export type Mutation_RootInsert_Blog_Blog_TagsArgs = {
  objects: Array<Blog_Blog_Tags_Insert_Input>
  on_conflict?: InputMaybe<Blog_Blog_Tags_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Blog_Blog_Tags_OneArgs = {
  object: Blog_Blog_Tags_Insert_Input
  on_conflict?: InputMaybe<Blog_Blog_Tags_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Blog_CommentsArgs = {
  objects: Array<Blog_Comments_Insert_Input>
  on_conflict?: InputMaybe<Blog_Comments_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Blog_Comments_OneArgs = {
  object: Blog_Comments_Insert_Input
  on_conflict?: InputMaybe<Blog_Comments_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Blog_TagsArgs = {
  objects: Array<Blog_Tags_Insert_Input>
  on_conflict?: InputMaybe<Blog_Tags_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Blog_Tags_OneArgs = {
  object: Blog_Tags_Insert_Input
  on_conflict?: InputMaybe<Blog_Tags_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_BlogsArgs = {
  objects: Array<Blogs_Insert_Input>
  on_conflict?: InputMaybe<Blogs_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Blogs_OneArgs = {
  object: Blogs_Insert_Input
  on_conflict?: InputMaybe<Blogs_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_UsersArgs = {
  objects: Array<Users_Insert_Input>
  on_conflict?: InputMaybe<Users_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Users_OneArgs = {
  object: Users_Insert_Input
  on_conflict?: InputMaybe<Users_On_Conflict>
}

/** mutation root */
export type Mutation_RootUpdate_Blog_Blog_TagsArgs = {
  _inc?: InputMaybe<Blog_Blog_Tags_Inc_Input>
  _set?: InputMaybe<Blog_Blog_Tags_Set_Input>
  where: Blog_Blog_Tags_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Blog_Blog_Tags_By_PkArgs = {
  _inc?: InputMaybe<Blog_Blog_Tags_Inc_Input>
  _set?: InputMaybe<Blog_Blog_Tags_Set_Input>
  pk_columns: Blog_Blog_Tags_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Blog_Blog_Tags_ManyArgs = {
  updates: Array<Blog_Blog_Tags_Updates>
}

/** mutation root */
export type Mutation_RootUpdate_Blog_CommentsArgs = {
  _inc?: InputMaybe<Blog_Comments_Inc_Input>
  _set?: InputMaybe<Blog_Comments_Set_Input>
  where: Blog_Comments_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Blog_Comments_By_PkArgs = {
  _inc?: InputMaybe<Blog_Comments_Inc_Input>
  _set?: InputMaybe<Blog_Comments_Set_Input>
  pk_columns: Blog_Comments_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Blog_Comments_ManyArgs = {
  updates: Array<Blog_Comments_Updates>
}

/** mutation root */
export type Mutation_RootUpdate_Blog_TagsArgs = {
  _inc?: InputMaybe<Blog_Tags_Inc_Input>
  _set?: InputMaybe<Blog_Tags_Set_Input>
  where: Blog_Tags_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Blog_Tags_By_PkArgs = {
  _inc?: InputMaybe<Blog_Tags_Inc_Input>
  _set?: InputMaybe<Blog_Tags_Set_Input>
  pk_columns: Blog_Tags_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Blog_Tags_ManyArgs = {
  updates: Array<Blog_Tags_Updates>
}

/** mutation root */
export type Mutation_RootUpdate_BlogsArgs = {
  _inc?: InputMaybe<Blogs_Inc_Input>
  _set?: InputMaybe<Blogs_Set_Input>
  where: Blogs_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Blogs_By_PkArgs = {
  _inc?: InputMaybe<Blogs_Inc_Input>
  _set?: InputMaybe<Blogs_Set_Input>
  pk_columns: Blogs_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Blogs_ManyArgs = {
  updates: Array<Blogs_Updates>
}

/** mutation root */
export type Mutation_RootUpdate_UsersArgs = {
  _inc?: InputMaybe<Users_Inc_Input>
  _set?: InputMaybe<Users_Set_Input>
  where: Users_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Users_By_PkArgs = {
  _inc?: InputMaybe<Users_Inc_Input>
  _set?: InputMaybe<Users_Set_Input>
  pk_columns: Users_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Users_ManyArgs = {
  updates: Array<Users_Updates>
}

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last',
}

export type Query_Root = {
  __typename?: 'query_root'
  /** An array relationship */
  blog_blog_tags: Array<Blog_Blog_Tags>
  /** An aggregate relationship */
  blog_blog_tags_aggregate: Blog_Blog_Tags_Aggregate
  /** fetch data from the table: "blog_blog_tags" using primary key columns */
  blog_blog_tags_by_pk?: Maybe<Blog_Blog_Tags>
  /** An array relationship */
  blog_comments: Array<Blog_Comments>
  /** An aggregate relationship */
  blog_comments_aggregate: Blog_Comments_Aggregate
  /** fetch data from the table: "blog_comments" using primary key columns */
  blog_comments_by_pk?: Maybe<Blog_Comments>
  /** fetch data from the table: "blog_tags" */
  blog_tags: Array<Blog_Tags>
  /** fetch aggregated fields from the table: "blog_tags" */
  blog_tags_aggregate: Blog_Tags_Aggregate
  /** fetch data from the table: "blog_tags" using primary key columns */
  blog_tags_by_pk?: Maybe<Blog_Tags>
  /** fetch data from the table: "blogs" */
  blogs: Array<Blogs>
  /** fetch aggregated fields from the table: "blogs" */
  blogs_aggregate: Blogs_Aggregate
  /** fetch data from the table: "blogs" using primary key columns */
  blogs_by_pk?: Maybe<Blogs>
  /** fetch data from the table: "users" */
  users: Array<Users>
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>
}

export type Query_RootBlog_Blog_TagsArgs = {
  distinct_on?: InputMaybe<Array<Blog_Blog_Tags_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Blog_Blog_Tags_Order_By>>
  where?: InputMaybe<Blog_Blog_Tags_Bool_Exp>
}

export type Query_RootBlog_Blog_Tags_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Blog_Blog_Tags_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Blog_Blog_Tags_Order_By>>
  where?: InputMaybe<Blog_Blog_Tags_Bool_Exp>
}

export type Query_RootBlog_Blog_Tags_By_PkArgs = {
  id: Scalars['Int']
}

export type Query_RootBlog_CommentsArgs = {
  distinct_on?: InputMaybe<Array<Blog_Comments_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Blog_Comments_Order_By>>
  where?: InputMaybe<Blog_Comments_Bool_Exp>
}

export type Query_RootBlog_Comments_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Blog_Comments_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Blog_Comments_Order_By>>
  where?: InputMaybe<Blog_Comments_Bool_Exp>
}

export type Query_RootBlog_Comments_By_PkArgs = {
  id: Scalars['Int']
}

export type Query_RootBlog_TagsArgs = {
  distinct_on?: InputMaybe<Array<Blog_Tags_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Blog_Tags_Order_By>>
  where?: InputMaybe<Blog_Tags_Bool_Exp>
}

export type Query_RootBlog_Tags_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Blog_Tags_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Blog_Tags_Order_By>>
  where?: InputMaybe<Blog_Tags_Bool_Exp>
}

export type Query_RootBlog_Tags_By_PkArgs = {
  id: Scalars['Int']
}

export type Query_RootBlogsArgs = {
  distinct_on?: InputMaybe<Array<Blogs_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Blogs_Order_By>>
  where?: InputMaybe<Blogs_Bool_Exp>
}

export type Query_RootBlogs_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Blogs_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Blogs_Order_By>>
  where?: InputMaybe<Blogs_Bool_Exp>
}

export type Query_RootBlogs_By_PkArgs = {
  id: Scalars['Int']
}

export type Query_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Users_Order_By>>
  where?: InputMaybe<Users_Bool_Exp>
}

export type Query_RootUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Users_Order_By>>
  where?: InputMaybe<Users_Bool_Exp>
}

export type Query_RootUsers_By_PkArgs = {
  id: Scalars['Int']
}

export type Subscription_Root = {
  __typename?: 'subscription_root'
  /** An array relationship */
  blog_blog_tags: Array<Blog_Blog_Tags>
  /** An aggregate relationship */
  blog_blog_tags_aggregate: Blog_Blog_Tags_Aggregate
  /** fetch data from the table: "blog_blog_tags" using primary key columns */
  blog_blog_tags_by_pk?: Maybe<Blog_Blog_Tags>
  /** fetch data from the table in a streaming manner: "blog_blog_tags" */
  blog_blog_tags_stream: Array<Blog_Blog_Tags>
  /** An array relationship */
  blog_comments: Array<Blog_Comments>
  /** An aggregate relationship */
  blog_comments_aggregate: Blog_Comments_Aggregate
  /** fetch data from the table: "blog_comments" using primary key columns */
  blog_comments_by_pk?: Maybe<Blog_Comments>
  /** fetch data from the table in a streaming manner: "blog_comments" */
  blog_comments_stream: Array<Blog_Comments>
  /** fetch data from the table: "blog_tags" */
  blog_tags: Array<Blog_Tags>
  /** fetch aggregated fields from the table: "blog_tags" */
  blog_tags_aggregate: Blog_Tags_Aggregate
  /** fetch data from the table: "blog_tags" using primary key columns */
  blog_tags_by_pk?: Maybe<Blog_Tags>
  /** fetch data from the table in a streaming manner: "blog_tags" */
  blog_tags_stream: Array<Blog_Tags>
  /** fetch data from the table: "blogs" */
  blogs: Array<Blogs>
  /** fetch aggregated fields from the table: "blogs" */
  blogs_aggregate: Blogs_Aggregate
  /** fetch data from the table: "blogs" using primary key columns */
  blogs_by_pk?: Maybe<Blogs>
  /** fetch data from the table in a streaming manner: "blogs" */
  blogs_stream: Array<Blogs>
  /** fetch data from the table: "users" */
  users: Array<Users>
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>
  /** fetch data from the table in a streaming manner: "users" */
  users_stream: Array<Users>
}

export type Subscription_RootBlog_Blog_TagsArgs = {
  distinct_on?: InputMaybe<Array<Blog_Blog_Tags_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Blog_Blog_Tags_Order_By>>
  where?: InputMaybe<Blog_Blog_Tags_Bool_Exp>
}

export type Subscription_RootBlog_Blog_Tags_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Blog_Blog_Tags_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Blog_Blog_Tags_Order_By>>
  where?: InputMaybe<Blog_Blog_Tags_Bool_Exp>
}

export type Subscription_RootBlog_Blog_Tags_By_PkArgs = {
  id: Scalars['Int']
}

export type Subscription_RootBlog_Blog_Tags_StreamArgs = {
  batch_size: Scalars['Int']
  cursor: Array<InputMaybe<Blog_Blog_Tags_Stream_Cursor_Input>>
  where?: InputMaybe<Blog_Blog_Tags_Bool_Exp>
}

export type Subscription_RootBlog_CommentsArgs = {
  distinct_on?: InputMaybe<Array<Blog_Comments_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Blog_Comments_Order_By>>
  where?: InputMaybe<Blog_Comments_Bool_Exp>
}

export type Subscription_RootBlog_Comments_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Blog_Comments_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Blog_Comments_Order_By>>
  where?: InputMaybe<Blog_Comments_Bool_Exp>
}

export type Subscription_RootBlog_Comments_By_PkArgs = {
  id: Scalars['Int']
}

export type Subscription_RootBlog_Comments_StreamArgs = {
  batch_size: Scalars['Int']
  cursor: Array<InputMaybe<Blog_Comments_Stream_Cursor_Input>>
  where?: InputMaybe<Blog_Comments_Bool_Exp>
}

export type Subscription_RootBlog_TagsArgs = {
  distinct_on?: InputMaybe<Array<Blog_Tags_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Blog_Tags_Order_By>>
  where?: InputMaybe<Blog_Tags_Bool_Exp>
}

export type Subscription_RootBlog_Tags_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Blog_Tags_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Blog_Tags_Order_By>>
  where?: InputMaybe<Blog_Tags_Bool_Exp>
}

export type Subscription_RootBlog_Tags_By_PkArgs = {
  id: Scalars['Int']
}

export type Subscription_RootBlog_Tags_StreamArgs = {
  batch_size: Scalars['Int']
  cursor: Array<InputMaybe<Blog_Tags_Stream_Cursor_Input>>
  where?: InputMaybe<Blog_Tags_Bool_Exp>
}

export type Subscription_RootBlogsArgs = {
  distinct_on?: InputMaybe<Array<Blogs_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Blogs_Order_By>>
  where?: InputMaybe<Blogs_Bool_Exp>
}

export type Subscription_RootBlogs_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Blogs_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Blogs_Order_By>>
  where?: InputMaybe<Blogs_Bool_Exp>
}

export type Subscription_RootBlogs_By_PkArgs = {
  id: Scalars['Int']
}

export type Subscription_RootBlogs_StreamArgs = {
  batch_size: Scalars['Int']
  cursor: Array<InputMaybe<Blogs_Stream_Cursor_Input>>
  where?: InputMaybe<Blogs_Bool_Exp>
}

export type Subscription_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Users_Order_By>>
  where?: InputMaybe<Users_Bool_Exp>
}

export type Subscription_RootUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Users_Order_By>>
  where?: InputMaybe<Users_Bool_Exp>
}

export type Subscription_RootUsers_By_PkArgs = {
  id: Scalars['Int']
}

export type Subscription_RootUsers_StreamArgs = {
  batch_size: Scalars['Int']
  cursor: Array<InputMaybe<Users_Stream_Cursor_Input>>
  where?: InputMaybe<Users_Bool_Exp>
}

/** Boolean expression to compare columns of type "time". All fields are combined with logical 'AND'. */
export type Time_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['time']>
  _gt?: InputMaybe<Scalars['time']>
  _gte?: InputMaybe<Scalars['time']>
  _in?: InputMaybe<Array<Scalars['time']>>
  _is_null?: InputMaybe<Scalars['Boolean']>
  _lt?: InputMaybe<Scalars['time']>
  _lte?: InputMaybe<Scalars['time']>
  _neq?: InputMaybe<Scalars['time']>
  _nin?: InputMaybe<Array<Scalars['time']>>
}

/** Boolean expression to compare columns of type "timestamp". All fields are combined with logical 'AND'. */
export type Timestamp_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamp']>
  _gt?: InputMaybe<Scalars['timestamp']>
  _gte?: InputMaybe<Scalars['timestamp']>
  _in?: InputMaybe<Array<Scalars['timestamp']>>
  _is_null?: InputMaybe<Scalars['Boolean']>
  _lt?: InputMaybe<Scalars['timestamp']>
  _lte?: InputMaybe<Scalars['timestamp']>
  _neq?: InputMaybe<Scalars['timestamp']>
  _nin?: InputMaybe<Array<Scalars['timestamp']>>
}

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']>
  _gt?: InputMaybe<Scalars['timestamptz']>
  _gte?: InputMaybe<Scalars['timestamptz']>
  _in?: InputMaybe<Array<Scalars['timestamptz']>>
  _is_null?: InputMaybe<Scalars['Boolean']>
  _lt?: InputMaybe<Scalars['timestamptz']>
  _lte?: InputMaybe<Scalars['timestamptz']>
  _neq?: InputMaybe<Scalars['timestamptz']>
  _nin?: InputMaybe<Array<Scalars['timestamptz']>>
}

/** columns and relationships of "users" */
export type Users = {
  __typename?: 'users'
  /** An array relationship */
  blog_comments: Array<Blog_Comments>
  /** An aggregate relationship */
  blog_comments_aggregate: Blog_Comments_Aggregate
  id: Scalars['Int']
  uuid: Scalars['String']
}

/** columns and relationships of "users" */
export type UsersBlog_CommentsArgs = {
  distinct_on?: InputMaybe<Array<Blog_Comments_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Blog_Comments_Order_By>>
  where?: InputMaybe<Blog_Comments_Bool_Exp>
}

/** columns and relationships of "users" */
export type UsersBlog_Comments_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Blog_Comments_Select_Column>>
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
  order_by?: InputMaybe<Array<Blog_Comments_Order_By>>
  where?: InputMaybe<Blog_Comments_Bool_Exp>
}

/** aggregated selection of "users" */
export type Users_Aggregate = {
  __typename?: 'users_aggregate'
  aggregate?: Maybe<Users_Aggregate_Fields>
  nodes: Array<Users>
}

/** aggregate fields of "users" */
export type Users_Aggregate_Fields = {
  __typename?: 'users_aggregate_fields'
  avg?: Maybe<Users_Avg_Fields>
  count: Scalars['Int']
  max?: Maybe<Users_Max_Fields>
  min?: Maybe<Users_Min_Fields>
  stddev?: Maybe<Users_Stddev_Fields>
  stddev_pop?: Maybe<Users_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Users_Stddev_Samp_Fields>
  sum?: Maybe<Users_Sum_Fields>
  var_pop?: Maybe<Users_Var_Pop_Fields>
  var_samp?: Maybe<Users_Var_Samp_Fields>
  variance?: Maybe<Users_Variance_Fields>
}

/** aggregate fields of "users" */
export type Users_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Users_Select_Column>>
  distinct?: InputMaybe<Scalars['Boolean']>
}

/** aggregate avg on columns */
export type Users_Avg_Fields = {
  __typename?: 'users_avg_fields'
  id?: Maybe<Scalars['Float']>
}

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  _and?: InputMaybe<Array<Users_Bool_Exp>>
  _not?: InputMaybe<Users_Bool_Exp>
  _or?: InputMaybe<Array<Users_Bool_Exp>>
  blog_comments?: InputMaybe<Blog_Comments_Bool_Exp>
  blog_comments_aggregate?: InputMaybe<Blog_Comments_Aggregate_Bool_Exp>
  id?: InputMaybe<Int_Comparison_Exp>
  uuid?: InputMaybe<String_Comparison_Exp>
}

/** unique or primary key constraints on table "users" */
export enum Users_Constraint {
  /** unique or primary key constraint on columns "id" */
  UsersPkey = 'users_pkey',
  /** unique or primary key constraint on columns "uuid" */
  UsersUuidKey = 'users_uuid_key',
}

/** input type for incrementing numeric columns in table "users" */
export type Users_Inc_Input = {
  id?: InputMaybe<Scalars['Int']>
}

/** input type for inserting data into table "users" */
export type Users_Insert_Input = {
  blog_comments?: InputMaybe<Blog_Comments_Arr_Rel_Insert_Input>
  id?: InputMaybe<Scalars['Int']>
  uuid?: InputMaybe<Scalars['String']>
}

/** aggregate max on columns */
export type Users_Max_Fields = {
  __typename?: 'users_max_fields'
  id?: Maybe<Scalars['Int']>
  uuid?: Maybe<Scalars['String']>
}

/** aggregate min on columns */
export type Users_Min_Fields = {
  __typename?: 'users_min_fields'
  id?: Maybe<Scalars['Int']>
  uuid?: Maybe<Scalars['String']>
}

/** response of any mutation on the table "users" */
export type Users_Mutation_Response = {
  __typename?: 'users_mutation_response'
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']
  /** data from the rows affected by the mutation */
  returning: Array<Users>
}

/** input type for inserting object relation for remote table "users" */
export type Users_Obj_Rel_Insert_Input = {
  data: Users_Insert_Input
  /** upsert condition */
  on_conflict?: InputMaybe<Users_On_Conflict>
}

/** on_conflict condition type for table "users" */
export type Users_On_Conflict = {
  constraint: Users_Constraint
  update_columns?: Array<Users_Update_Column>
  where?: InputMaybe<Users_Bool_Exp>
}

/** Ordering options when selecting data from "users". */
export type Users_Order_By = {
  blog_comments_aggregate?: InputMaybe<Blog_Comments_Aggregate_Order_By>
  id?: InputMaybe<Order_By>
  uuid?: InputMaybe<Order_By>
}

/** primary key columns input for table: users */
export type Users_Pk_Columns_Input = {
  id: Scalars['Int']
}

/** select columns of table "users" */
export enum Users_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Uuid = 'uuid',
}

/** input type for updating data in table "users" */
export type Users_Set_Input = {
  id?: InputMaybe<Scalars['Int']>
  uuid?: InputMaybe<Scalars['String']>
}

/** aggregate stddev on columns */
export type Users_Stddev_Fields = {
  __typename?: 'users_stddev_fields'
  id?: Maybe<Scalars['Float']>
}

/** aggregate stddev_pop on columns */
export type Users_Stddev_Pop_Fields = {
  __typename?: 'users_stddev_pop_fields'
  id?: Maybe<Scalars['Float']>
}

/** aggregate stddev_samp on columns */
export type Users_Stddev_Samp_Fields = {
  __typename?: 'users_stddev_samp_fields'
  id?: Maybe<Scalars['Float']>
}

/** Streaming cursor of the table "users" */
export type Users_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Users_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Users_Stream_Cursor_Value_Input = {
  id?: InputMaybe<Scalars['Int']>
  uuid?: InputMaybe<Scalars['String']>
}

/** aggregate sum on columns */
export type Users_Sum_Fields = {
  __typename?: 'users_sum_fields'
  id?: Maybe<Scalars['Int']>
}

/** update columns of table "users" */
export enum Users_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Uuid = 'uuid',
}

export type Users_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Users_Inc_Input>
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Users_Set_Input>
  where: Users_Bool_Exp
}

/** aggregate var_pop on columns */
export type Users_Var_Pop_Fields = {
  __typename?: 'users_var_pop_fields'
  id?: Maybe<Scalars['Float']>
}

/** aggregate var_samp on columns */
export type Users_Var_Samp_Fields = {
  __typename?: 'users_var_samp_fields'
  id?: Maybe<Scalars['Float']>
}

/** aggregate variance on columns */
export type Users_Variance_Fields = {
  __typename?: 'users_variance_fields'
  id?: Maybe<Scalars['Float']>
}
