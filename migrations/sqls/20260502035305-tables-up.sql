/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS tables(
        id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        table_number VARCHAR(255) NOT NULL UNIQUE,
        capacity VARCHAR(255) NOT NULL,
        status VARCHAR(255) NOT NULL,
        reservation_time VARCHAR(255) NOT NULL
)