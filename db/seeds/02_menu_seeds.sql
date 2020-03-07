INSERT INTO menu (name, description, food_category, item_img, price) VALUES
  (
    'Fish -N- Chips',
    'The best fried halibut you''ll ever have. Made to oder by S.Gamgee, you can''t say no to that!',
    'fish',
    'fish-and-chips.jpg',
    1999
  ),
  (
    'Beef Wellington',
    'Beef fillet, surrounded in love and baked to perfection in Fatty Bolger approved puff pastry. This''ll be sure to put a smile on your Old Gaffers face',
    'beef',
    'image',
    2999
  );

INSERT INTO orders (user_id, menu_id, item_name, amount)
VALUES (1, 1, 'Fish -N- Chips', 1);