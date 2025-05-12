/*
  # Create initial users for TSUTSUJI

  1. Changes
    - Insert initial users with correct birthdates
      - Hibiki (1996-11-13)
      - Asuka (1995-05-18)

  2. Security
    - No changes to existing RLS policies
*/

-- Insert initial users
INSERT INTOusers (id, name, birthdate)
VALUES 
  ('d7bed82f-4c32-4891-a6e6-2c53137fe218', 'あすか', '1995-05-18'),
  ('e9bed82f-4c32-4891-a6e6-2c53137fe219', 'ひびき', '1996-11-13');