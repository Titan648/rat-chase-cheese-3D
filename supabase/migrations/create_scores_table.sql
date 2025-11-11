/*
  # Create scores table for Rat Chase Fromage game

  1. New Tables
    - `scores`
      - `id` (uuid, primary key)
      - `player_name` (text, player's name)
      - `score` (integer, game score)
      - `created_at` (timestamp, when score was recorded)
  
  2. Security
    - Enable RLS on `scores` table
    - Add policy for anyone to read scores
    - Add policy for anyone to insert scores
*/

CREATE TABLE IF NOT EXISTS scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_name text NOT NULL,
  score integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE scores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read scores"
  ON scores
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can insert scores"
  ON scores
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
