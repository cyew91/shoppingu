INSERT INTO country (id, country_code, country_name, currency_code, currency_name, is_active, updated_date) 
VALUES (uuid(), 'MY', 'Malaysia', 'MYR', 'Ringgit Malaysia', 1, now());
INSERT INTO country (id, country_code, country_name, currency_code, currency_name, is_active, updated_date) 
VALUES (uuid(), 'SG', 'Singapore', 'SGD', 'Singapore Dollar', 1, now());
INSERT INTO country (id, country_code, country_name, currency_code, currency_name, is_active, updated_date) 
VALUES (uuid(), 'TH', 'Thailand', 'THB', 'Thai Baht', 1, now());
INSERT INTO country (id, country_code, country_name, currency_code, currency_name, is_active, updated_date) 
VALUES (uuid(), 'JP', 'Japan', 'JPY', 'Japanese Yen', 1, now());
INSERT INTO country (id, country_code, country_name, currency_code, currency_name, is_active, updated_date) 
VALUES (uuid(), 'TW', 'Taiwan', 'TWD', 'New Taiwan Dollar', 1, now());
INSERT INTO country (id, country_code, country_name, currency_code, currency_name, is_active, updated_date) 
VALUES (uuid(), 'HK', 'Hong Kong', 'HKD', 'Hong Kong Dollar', 1, now());
INSERT INTO country (id, country_code, country_name, currency_code, currency_name, is_active, updated_date) 
VALUES (uuid(), 'ID', 'Indonesia', 'IDR', 'Indonesia Rupiah', 1, now());
INSERT INTO country (id, country_code, country_name, currency_code, currency_name, is_active, updated_date) 
VALUES (uuid(), 'CN', 'China', 'RMB', 'Renminbi', 1, now());
INSERT INTO country (id, country_code, country_name, currency_code, currency_name, is_active, updated_date) 
VALUES (uuid(), 'AU', 'Australia', 'AUD', 'Australian Dollar', 1, now());

INSERT INTO profile (id, first_name, last_name, address, email, contact_no, gender, date_of_birth, image_name, image_path, login_id, hash_password, salt_password, is_active, token, facebook_user_id, created_date, updated_date, country_id) 
VALUES (uuid(), 'System', 'Admin', '1A, Jalan Lekor, 12345, Malaysia', 'admin@shoppingu.net', '1234567', 'M', '2019-12-31', '', '', 'admin', '', '', '1', '', '', now(), now(), (select id from country where country_code='MY'));


INSERT INTO product_category (id, product_category_code, product_category_name, is_active, updated_date)
VALUES (uuid(), '100', 'Men Fashion', 1, now());
INSERT INTO product_sub_category (id, product_sub_category_code, product_sub_category_name, is_active, updated_date, product_category_id)
VALUES (uuid(), '101', 'Clothes', 1, now(), (select id from product_category where product_category_code=100));
INSERT INTO product_sub_category (id, product_sub_category_code, product_sub_category_name, is_active, updated_date, product_category_id)
VALUES (uuid(), '102', 'Footwear', 1, now(), (select id from product_category where product_category_code=100));
INSERT INTO product_sub_category (id, product_sub_category_code, product_sub_category_name, is_active, updated_date, product_category_id)
VALUES (uuid(), '103', 'Accessories', 1, now(), (select id from product_category where product_category_code=100));

INSERT into product_category (id, product_category_code, product_category_name, is_active, updated_date)
VALUES (uuid(), '200', 'Women Fashion', 1, now());
INSERT into product_sub_category (id, product_sub_category_code, product_sub_category_name, is_active, updated_date, product_category_id)
VALUES (uuid(), '201', 'Clothes', 1, now(), (select id from product_category where product_category_code=200));
INSERT into product_sub_category (id, product_sub_category_code, product_sub_category_name, is_active, updated_date, product_category_id)
VALUES (uuid(), '202', 'Footwear', 1, now(), (select id from product_category where product_category_code=200));
INSERT into product_sub_category (id, product_sub_category_code, product_sub_category_name, is_active, updated_date, product_category_id)
VALUES (uuid(), '203', 'Accessories', 1, now(), (select id from product_category where product_category_code=200));

INSERT into product_category (id, product_category_code, product_category_name, is_active, updated_date)
VALUES (uuid(), '300', 'Grocery', 1, now());
INSERT into product_sub_category (id, product_sub_category_code, product_sub_category_name, is_active, updated_date, product_category_id)
VALUES (uuid(), '301', 'Snacks', 1, now(), (select id from product_category where product_category_code=300));
INSERT into product_sub_category (id, product_sub_category_code, product_sub_category_name, is_active, updated_date, product_category_id)
VALUES (uuid(), '302', 'Alcohol', 1, now(), (select id from product_category where product_category_code=300));

INSERT into product_category (id, product_category_code, product_category_name, is_active, updated_date)
VALUES (uuid(), '400', 'Electronic', 1, now());
INSERT into product_sub_category (id, product_sub_category_code, product_sub_category_name, is_active, updated_date, product_category_id)
VALUES (uuid(), '401', 'Computers & Accessories', 1, now(), (select id from product_category where product_category_code=400));
INSERT into product_sub_category (id, product_sub_category_code, product_sub_category_name, is_active, updated_date, product_category_id)
VALUES (uuid(), '402', 'Mobile', 1, now(), (select id from product_category where product_category_code=400));

INSERT into product_category (id, product_category_code, product_category_name, is_active, updated_date)
VALUES (uuid(), '500', 'Health & Beauty', 1, now());
INSERT into product_sub_category (id, product_sub_category_code, product_sub_category_name, is_active, updated_date, product_category_id)
VALUES (uuid(), '501', 'Face Makeup', 1, now(), (select id from product_category where product_category_code=500));
INSERT into product_sub_category (id, product_sub_category_code, product_sub_category_name, is_active, updated_date, product_category_id)
VALUES (uuid(), '502', 'Skincare', 1, now(), (select id from product_category where product_category_code=500));
INSERT into product_sub_category (id, product_sub_category_code, product_sub_category_name, is_active, updated_date, product_category_id)
VALUES (uuid(), '503', 'Hair Care', 1, now(), (select id from product_category where product_category_code=500));


