export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      answer_attempt: {
        Row: {
          answer_option_id: number
          created_at: string
          created_by: string | null
          id: number
          is_selected_as_correct: boolean
          question_attempt_id: number
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          answer_option_id: number
          created_at: string
          created_by?: string | null
          id?: number
          is_selected_as_correct: boolean
          question_attempt_id: number
          updated_at: string
          updated_by?: string | null
        }
        Update: {
          answer_option_id?: number
          created_at?: string
          created_by?: string | null
          id?: number
          is_selected_as_correct?: boolean
          question_attempt_id?: number
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "answer_attempt_answer_option_id_fkey"
            columns: ["answer_option_id"]
            isOneToOne: false
            referencedRelation: "answer_option"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "answer_attempt_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "answer_attempt_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "vw_user_role_list"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "answer_attempt_question_attempt_id_fkey"
            columns: ["question_attempt_id"]
            isOneToOne: false
            referencedRelation: "question_attempt"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "answer_attempt_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "answer_attempt_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "vw_user_role_list"
            referencedColumns: ["user_id"]
          },
        ]
      }
      answer_option: {
        Row: {
          answer: string
          created_at: string
          created_by: string | null
          id: number
          is_correct: boolean
          justification: string | null
          question_id: number
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          answer: string
          created_at: string
          created_by?: string | null
          id?: number
          is_correct: boolean
          justification?: string | null
          question_id: number
          updated_at: string
          updated_by?: string | null
        }
        Update: {
          answer?: string
          created_at?: string
          created_by?: string | null
          id?: number
          is_correct?: boolean
          justification?: string | null
          question_id?: number
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "answer_option_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "answer_option_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "vw_user_role_list"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "answer_option_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "question"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "answer_option_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "vw_question"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "answer_option_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "answer_option_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "vw_user_role_list"
            referencedColumns: ["user_id"]
          },
        ]
      }
      category: {
        Row: {
          created_at: string
          created_by: string | null
          id: number
          name: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at: string
          created_by?: string | null
          id?: number
          name: string
          updated_at: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: number
          name?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "category_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "category_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "vw_user_role_list"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "category_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "category_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "vw_user_role_list"
            referencedColumns: ["user_id"]
          },
        ]
      }
      course: {
        Row: {
          created_at: string
          created_by: string | null
          id: number
          name: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at: string
          created_by?: string | null
          id?: number
          name: string
          updated_at: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: number
          name?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "course_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "vw_user_role_list"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "course_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "course_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "vw_user_role_list"
            referencedColumns: ["user_id"]
          },
        ]
      }
      marked_question: {
        Row: {
          created_at: string
          created_by: string | null
          question_id: number
          updated_at: string
          updated_by: string | null
          user_id: string
        }
        Insert: {
          created_at: string
          created_by?: string | null
          question_id: number
          updated_at: string
          updated_by?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          question_id?: number
          updated_at?: string
          updated_by?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "marked_question_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "marked_question_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "vw_user_role_list"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "marked_question_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "question"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "marked_question_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "vw_question"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "marked_question_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "marked_question_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "vw_user_role_list"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "marked_question_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "marked_question_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "vw_user_role_list"
            referencedColumns: ["user_id"]
          },
        ]
      }
      profile: {
        Row: {
          created_at: string
          created_by: string | null
          email: string
          first_name: string
          is_active: boolean
          last_name: string
          updated_at: string
          updated_by: string | null
          user_id: string
        }
        Insert: {
          created_at: string
          created_by?: string | null
          email: string
          first_name: string
          is_active?: boolean
          last_name: string
          updated_at: string
          updated_by?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          email?: string
          first_name?: string
          is_active?: boolean
          last_name?: string
          updated_at?: string
          updated_by?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profile_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "profile_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "vw_user_role_list"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "profile_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "profile_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "vw_user_role_list"
            referencedColumns: ["user_id"]
          },
        ]
      }
      question: {
        Row: {
          created_at: string
          created_by: string | null
          hint: string | null
          id: number
          question: string
          question_status_id: number
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at: string
          created_by?: string | null
          hint?: string | null
          id?: number
          question: string
          question_status_id: number
          updated_at: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          hint?: string | null
          id?: number
          question?: string
          question_status_id?: number
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "question_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "question_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "vw_user_role_list"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "question_question_status_id_fkey"
            columns: ["question_status_id"]
            isOneToOne: false
            referencedRelation: "question_status"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "question_question_status_id_fkey"
            columns: ["question_status_id"]
            isOneToOne: false
            referencedRelation: "vw_question"
            referencedColumns: ["question_status_id"]
          },
          {
            foreignKeyName: "question_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "question_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "vw_user_role_list"
            referencedColumns: ["user_id"]
          },
        ]
      }
      question_attempt: {
        Row: {
          created_at: string
          created_by: string | null
          has_used_hint: boolean
          id: number
          quiz_participant_id: number
          quiz_question_id: number
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at: string
          created_by?: string | null
          has_used_hint: boolean
          id?: number
          quiz_participant_id: number
          quiz_question_id: number
          updated_at: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          has_used_hint?: boolean
          id?: number
          quiz_participant_id?: number
          quiz_question_id?: number
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "question_attempt_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "question_attempt_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "vw_user_role_list"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "question_attempt_quiz_participant_id_fkey"
            columns: ["quiz_participant_id"]
            isOneToOne: false
            referencedRelation: "quiz_participant"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "question_attempt_quiz_question_id_fkey"
            columns: ["quiz_question_id"]
            isOneToOne: false
            referencedRelation: "quiz_question"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "question_attempt_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "question_attempt_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "vw_user_role_list"
            referencedColumns: ["user_id"]
          },
        ]
      }
      question_category: {
        Row: {
          category_id: number
          created_at: string
          created_by: string | null
          question_id: number
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          category_id: number
          created_at: string
          created_by?: string | null
          question_id: number
          updated_at: string
          updated_by?: string | null
        }
        Update: {
          category_id?: number
          created_at?: string
          created_by?: string | null
          question_id?: number
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "question_category_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "category"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "question_category_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "question_category_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "vw_user_role_list"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "question_category_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "question"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "question_category_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "vw_question"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "question_category_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "question_category_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "vw_user_role_list"
            referencedColumns: ["user_id"]
          },
        ]
      }
      question_course: {
        Row: {
          course_id: number
          created_at: string
          created_by: string | null
          question_id: number
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          course_id: number
          created_at: string
          created_by?: string | null
          question_id: number
          updated_at: string
          updated_by?: string | null
        }
        Update: {
          course_id?: number
          created_at?: string
          created_by?: string | null
          question_id?: number
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "question_course_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "course"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "question_course_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "question_course_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "vw_user_role_list"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "question_course_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "question"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "question_course_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "vw_question"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "question_course_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "question_course_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "vw_user_role_list"
            referencedColumns: ["user_id"]
          },
        ]
      }
      question_status: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      quiz: {
        Row: {
          created_at: string
          created_by: string | null
          id: number
          quiz_status_id: number
          quiz_type_id: number
          seconds_per_question: number
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at: string
          created_by?: string | null
          id?: number
          quiz_status_id: number
          quiz_type_id: number
          seconds_per_question: number
          updated_at: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: number
          quiz_status_id?: number
          quiz_type_id?: number
          seconds_per_question?: number
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quiz_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "quiz_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "vw_user_role_list"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "quiz_quiz_status_id_fkey"
            columns: ["quiz_status_id"]
            isOneToOne: false
            referencedRelation: "quiz_status"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quiz_quiz_status_id_fkey"
            columns: ["quiz_status_id"]
            isOneToOne: false
            referencedRelation: "vw_quiz"
            referencedColumns: ["quiz_status_id"]
          },
          {
            foreignKeyName: "quiz_quiz_type_id_fkey"
            columns: ["quiz_type_id"]
            isOneToOne: false
            referencedRelation: "quiz_type"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quiz_quiz_type_id_fkey"
            columns: ["quiz_type_id"]
            isOneToOne: false
            referencedRelation: "vw_quiz"
            referencedColumns: ["quiz_type_id"]
          },
          {
            foreignKeyName: "quiz_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "quiz_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "vw_user_role_list"
            referencedColumns: ["user_id"]
          },
        ]
      }
      quiz_participant: {
        Row: {
          created_at: string
          created_by: string | null
          id: number
          quiz_id: number
          updated_at: string
          updated_by: string | null
          user_id: string
        }
        Insert: {
          created_at: string
          created_by?: string | null
          id?: number
          quiz_id: number
          updated_at: string
          updated_by?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: number
          quiz_id?: number
          updated_at?: string
          updated_by?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "quiz_participant_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "quiz_participant_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "vw_user_role_list"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "quiz_participant_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quiz"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quiz_participant_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "vw_quiz"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quiz_participant_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "quiz_participant_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "vw_user_role_list"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "quiz_participant_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "quiz_participant_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "vw_user_role_list"
            referencedColumns: ["user_id"]
          },
        ]
      }
      quiz_question: {
        Row: {
          created_at: string
          created_by: string | null
          id: number
          order_number: number
          question_id: number
          quiz_id: number
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at: string
          created_by?: string | null
          id?: number
          order_number: number
          question_id: number
          quiz_id: number
          updated_at: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: number
          order_number?: number
          question_id?: number
          quiz_id?: number
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quiz_question_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "quiz_question_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "vw_user_role_list"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "quiz_question_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "question"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quiz_question_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "vw_question"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quiz_question_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quiz"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quiz_question_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "vw_quiz"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quiz_question_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "quiz_question_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "vw_user_role_list"
            referencedColumns: ["user_id"]
          },
        ]
      }
      quiz_status: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      quiz_type: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      role: {
        Row: {
          description: string
          id: number
          name: string
        }
        Insert: {
          description: string
          id?: number
          name: string
        }
        Update: {
          description?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      user_role: {
        Row: {
          created_at: string
          created_by: string | null
          role_id: number
          updated_at: string
          updated_by: string | null
          user_id: string
        }
        Insert: {
          created_at: string
          created_by?: string | null
          role_id: number
          updated_at: string
          updated_by?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          role_id?: number
          updated_at?: string
          updated_by?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_role_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "user_role_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "vw_user_role_list"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "user_role_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "role"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_role_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "user_role_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "vw_user_role_list"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "user_role_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "user_role_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "vw_user_role_list"
            referencedColumns: ["user_id"]
          },
        ]
      }
    }
    Views: {
      vw_question: {
        Row: {
          categories: string[] | null
          courses: string[] | null
          created_at: string | null
          created_by: string | null
          hint: string | null
          id: number | null
          question: string | null
          question_status_id: number | null
          question_status_name: string | null
          status_icon: string | null
          status_severity: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Relationships: [
          {
            foreignKeyName: "question_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "question_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "vw_user_role_list"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "question_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "question_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "vw_user_role_list"
            referencedColumns: ["user_id"]
          },
        ]
      }
      vw_quiz: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: number | null
          question_count: number | null
          quiz_status_id: number | null
          quiz_status_name: string | null
          quiz_type_id: number | null
          quiz_type_name: string | null
          seconds_per_question: number | null
          status_icon: string | null
          status_severity: string | null
          type_icon: string | null
          type_severity: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quiz_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "quiz_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "vw_user_role_list"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "quiz_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "quiz_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "vw_user_role_list"
            referencedColumns: ["user_id"]
          },
        ]
      }
      vw_user_role_list: {
        Row: {
          email: string | null
          first_name: string | null
          is_active: boolean | null
          last_name: string | null
          roles: string | null
          user_id: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      add_audit_columns: {
        Args: {
          schema_name: string
          table_name: string
        }
        Returns: undefined
      }
      create_audit_trigger: {
        Args: {
          schema_name: string
          table_name: string
        }
        Returns: undefined
      }
      create_quiz: {
        Args: {
          p_quiz_type_id: number
          p_seconds_per_question: number
          p_number_of_questions: number
          p_course_ids?: number[]
          p_category_ids?: number[]
        }
        Returns: number
      }
      get_interactable_quizzes_for_user: {
        Args: {
          p_user_id: string
        }
        Returns: {
          created_at: string | null
          created_by: string | null
          id: number | null
          question_count: number | null
          quiz_status_id: number | null
          quiz_status_name: string | null
          quiz_type_id: number | null
          quiz_type_name: string | null
          seconds_per_question: number | null
          status_icon: string | null
          status_severity: string | null
          type_icon: string | null
          type_severity: string | null
          updated_at: string | null
          updated_by: string | null
        }[]
      }
      has_role: {
        Args: {
          role_name: string
        }
        Returns: boolean
      }
      insert_question_with_details: {
        Args: {
          json_input: Json
        }
        Returns: undefined
      }
      test_audit_columns: {
        Args: {
          schema_name: string
          table_name: string
        }
        Returns: string[]
      }
      update_question_with_details: {
        Args: {
          json_input: Json
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

