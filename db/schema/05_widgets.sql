-- Drop and recreate Widgets table (Example)

DROP TABLE IF EXISTS menu CASCADE;
DROP TABLE IF EXISTS orders CASCADE;

CREATE TABLE menu (
  id SERIAL PRIMARY KEY NOT NULL,

  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  food_category VARCHAR(255) NOT NULL,

  item_img TEXT NOT NULL,

  price SMALLINT NOT NULL
);

CREATE TABLE orders (
  user_id INTEGER REFERENCES users.id ON DELETE CASCADE,
  order_id INTEGER REFERENCES menu.id ON DELETE CASCADE,

  order_status BOOLEAN DEFAULT FALSE,
  order_begin TIMESTAMP,
  order_end TIMESTAMP,
  order_date DATE NOT NULL
);
