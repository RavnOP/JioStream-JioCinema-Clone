export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      continue_watching: {
        Row: {
          content_id: string
          content_type: string
          duration_seconds: number
          episode_number: number | null
          id: string
          last_watched: string
          poster_path: string | null
          progress_seconds: number
          season_number: number | null
          title: string
          user_id: string
        }
        Insert: {
          content_id: string
          content_type: string
          duration_seconds?: number
          episode_number?: number | null
          id?: string
          last_watched?: string
          poster_path?: string | null
          progress_seconds?: number
          season_number?: number | null
          title: string
          user_id: string
        }
        Update: {
          content_id?: string
          content_type?: string
          duration_seconds?: number
          episode_number?: number | null
          id?: string
          last_watched?: string
          poster_path?: string | null
          progress_seconds?: number
          season_number?: number | null
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "continue_watching_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      likes: {
        Row: {
          content_id: string
          content_type: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          content_id: string
          content_type: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          content_id?: string
          content_type?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      watch_history: {
        Row: {
          content_id: string
          content_type: string
          id: string
          poster_path: string | null
          title: string
          user_id: string
          watched_at: string
        }
        Insert: {
          content_id: string
          content_type: string
          id?: string
          poster_path?: string | null
          title: string
          user_id: string
          watched_at?: string
        }
        Update: {
          content_id?: string
          content_type?: string
          id?: string
          poster_path?: string | null
          title?: string
          user_id?: string
          watched_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "watch_history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      watchlist: {
        Row: {
          added_at: string
          content_id: string
          content_type: string
          id: string
          user_id: string
        }
        Insert: {
          added_at?: string
          content_id: string
          content_type: string
          id?: string
          user_id: string
        }
        Update: {
          added_at?: string
          content_id?: string
          content_type?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "watchlist_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      comments: {
        Row: {
          id: string
          user_id: string
          content_id: string
          content_type: string
          comment: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          content_id: string
          content_type: string
          comment: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          content_id?: string
          content_type?: string
          comment?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

