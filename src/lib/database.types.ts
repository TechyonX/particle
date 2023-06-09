export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      particle: {
        Row: {
          content: string;
          created_at: string;
          description: string | null;
          embedding: string | null;
          fts: unknown | null;
          id: string;
          image: string | null;
          is_archived: boolean;
          is_public: boolean;
          is_trashed: boolean;
          title: string | null;
          type: number;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          content: string;
          created_at?: string;
          description?: string | null;
          embedding?: string | null;
          fts?: unknown | null;
          id?: string;
          image?: string | null;
          is_archived?: boolean;
          is_public?: boolean;
          is_trashed?: boolean;
          title?: string | null;
          type: number;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          content?: string;
          created_at?: string;
          description?: string | null;
          embedding?: string | null;
          fts?: unknown | null;
          id?: string;
          image?: string | null;
          is_archived?: boolean;
          is_public?: boolean;
          is_trashed?: boolean;
          title?: string | null;
          type?: number;
          updated_at?: string;
          user_id?: string;
        };
      };
      particle_tag: {
        Row: {
          created_at: string;
          id: number;
          particle_id: string;
          tag_id: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          particle_id: string;
          tag_id: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          particle_id?: string;
          tag_id?: string;
        };
      };
      profile: {
        Row: {
          first_name: string | null;
          id: string;
          last_name: string | null;
        };
        Insert: {
          first_name?: string | null;
          id: string;
          last_name?: string | null;
        };
        Update: {
          first_name?: string | null;
          id?: string;
          last_name?: string | null;
        };
      };
      tag: {
        Row: {
          color: string | null;
          created_at: string;
          emoji: string | null;
          id: string;
          name: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          color?: string | null;
          created_at?: string;
          emoji?: string | null;
          id?: string;
          name: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          color?: string | null;
          created_at?: string;
          emoji?: string | null;
          id?: string;
          name?: string;
          updated_at?: string;
          user_id?: string;
        };
      };
      type: {
        Row: {
          created_at: string;
          emoji: string;
          id: number;
          name: string;
        };
        Insert: {
          created_at?: string;
          emoji: string;
          id?: number;
          name: string;
        };
        Update: {
          created_at?: string;
          emoji?: string;
          id?: number;
          name?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      check_particle_tag: {
        Args: {
          uid: string;
          ptid: number;
        };
        Returns: boolean;
      };
      get_tags_with_particle_count: {
        Args: {
          uid: string;
        };
        Returns: {
          id: string;
          name: string;
          emoji: string;
          color: string;
          user_id: string;
          created_at: string;
          updated_at: string;
          particle_count: number;
        }[];
      };
      match_particles: {
        Args: {
          query_embedding: string;
          similarity_threshold: number;
          match_count: number;
          uid: string;
        };
        Returns: {
          particle_id: string;
          particle_title: string;
          particle_description: string;
          particle_content: string;
          particle_uid: string;
          similarity: number;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
