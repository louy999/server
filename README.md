# 3. Database Design

## 3.1 users

Stores all system users.

| Field      | Type      | Description                                       |
| ---------- | --------- | ------------------------------------------------- |
| id         | UUID      | Primary key                                       |
| name       | VARCHAR   | User name                                         |
| access     | ENUM      | Role (customer, captain, cashier, barista, admin) |
| password   | VARCHAR   | Hashed password                                   |
| salary     | DECIMAL   | Salary amount                                     |
| date       | TIMESTAMP | Created date                                      |

---

## 3.2 tables

Stores cafe tables.

| Field              | Type    | Description                    |
| -----------------  | ------- | ------------------------------ |
| id                 | UUID    | Primary key                    |
| table_number       | INT     | Table number                   |
| capacity           | VARCHAR | capacity people in table       |
| status             | VARCHAR | available / pusy               |
| reservation_time   | VARCHAR | date                           |

---

## 3.3 menu

Stores menu items.

| Field        | Type    | Description           |
| ------------ | ------- | --------------------- |
| id           | UUID    | Primary key           |
| name         | VARCHAR | Item name             |
| price        | DECIMAL | Selling price         |

---

## 3.4 storage

Stores inventory items.

| Field      | Type    | Description     |
| ---------- | ------- | --------------- |
| id         | UUID    | Primary key     |
| name       | VARCHAR | Ingredient name |
| quantity   | DECIMAL | Current stock   |
| cost_price | DECIMAL | Purchase cost   |
| unit       | VARCHAR | g / ml / pcs    |

---

## 3.5 order_storage

Tracks inventory usage.

| Field         | Type      | Description    |
| ------------- | --------- | -------------- |
| id            | UUID      | Primary key    |
| storage_id    | UUID      | Inventory item |
| used_quantity | DECIMAL   | Used amount    |
| cost          | DECIMAL   | Cost           |
| date          | TIMESTAMP | Usage date     |

---

## 3.6 orders

Stores orders.

| Field         | Type      | Description                      |
| ------------- | --------- | -------------------------------- |
| id            | UUID      | Primary key                      |
| table_id      | UUID      | Table                            |
| customer_name | VARCHAR   | Optional                         |
| date          | TIMESTAMP | Order date                       |
| status        | ENUM      | new / preparing / ready / closed |

---

## 3.7 order_items

Stores items inside each order.

| Field    | Type | Description                      |
| -------- | ---- | -------------------------------- |
| id       | UUID | Primary key                      |
| order_id | UUID | Order                            |
| menu_id  | UUID | Menu item                        |
| quantity | INT  | Qty                              |
| notes    | TEXT | Notes                            |
| status   | ENUM | new / preparing / ready / served |

---

## 3.8 pay_orders

Stores payment info.

| Field    | Type      | Description                             |
| -------- | --------- | --------------------------------------- |
| id       | UUID      | Primary key                             |
| order_id | UUID      | Order                                   |
| status   | ENUM      | pending / paid / failed                 |
| how_pay  | ENUM      | cash / visa / vodafone_cash / apple_pay |
| paid_at  | TIMESTAMP | Payment date                            |

---

## 3.9 expenses

Stores expenses.

| Field  | Type      | Description  |
| ------ | --------- | ------------ |
| id     | UUID      | Primary key  |
| date   | TIMESTAMP | Expense date |
| price  | DECIMAL   | Amount       |
| reason | TEXT      | Reason       |
| name   | VARCHAR   | Added by     |

---
