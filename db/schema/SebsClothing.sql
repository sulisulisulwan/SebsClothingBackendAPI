DROP DATABASE IF EXISTS SebsClothing;

CREATE DATABASE SebsClothing;

USE SebsClothing;

CREATE TABLE Product (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100),
  slogan VARCHAR(256),
  description VARCHAR(1000),
  category VARCHAR(100),
  default_price VARCHAR(20),
  PRIMARY KEY (ID)
);

CREATE TABLE Features (
  ID INT NOT NULL AUTO_INCREMENT,
  product_id INT,
  feature VARCHAR(100),
  value VARCHAR(100),
  PRIMARY KEY (ID),
  FOREIGN KEY (product_id) REFERENCES Product(id)
);

CREATE TABLE Related (
  ID INT NOT NULL AUTO_INCREMENT,
  current_product_id INT,
  related_product_id INT,
  PRIMARY KEY (ID)
);

CREATE TABLE SKUs (
  ID INT NOT NULL AUTO_INCREMENT,
  styleId INT,
  size VARCHAR (15),
  quantity INT,
  PRIMARY KEY (ID)
);

CREATE TABLE Styles (
  ID INT NOT NULL AUTO_INCREMENT,
  productId INT,
  name VARCHAR(256),
  sale_price VARCHAR(20),
  original_price VARCHAR(20),
  default_style VARCHAR(20),
  PRIMARY KEY (ID)
);

CREATE TABLE  Product_Photos (
  ID INT NOT NULL AUTO_INCREMENT,
  styleId INT,
  url VARCHAR(256),
  thumbnail_url VARCHAR(256),
  PRIMARY KEY (ID)
);


CREATE TABLE Questions (
  id INT NOT NULL AUTO_INCREMENT,
  product_id INT,
  body VARCHAR(1000),
  date_written DATETIME,
  asker_name VARCHAR(100),
  asker_email VARCHAR(100),
  reported BOOLEAN,
  helpful INT,
  PRIMARY KEY (id),
  FOREIGN KEY (product_id) REFERENCES Product(id)
);

CREATE TABLE Answers (
  id INT NOT NULL AUTO_INCREMENT,
  question_id INT,
  body VARCHAR(1000),
  date_written DATETIME,
  answerer_name VARCHAR(100),
  answerer_email VARCHAR(100),
  reported BOOLEAN,
  helpful INT,
  PRIMARY KEY (id),
  FOREIGN KEY (question_id) REFERENCES Questions(id)
);

CREATE TABLE Answers_Photos (
  ID INT NOT NULL AUTO_INCREMENT,
  answer_id INT,
  url VARCHAR(250),
  PRIMARY KEY (ID),
  FOREIGN KEY (answer_id) REFERENCES Answers(id)
);

CREATE TABLE Characteristics (
  id INT NOT NULL AUTO_INCREMENT,
  product_id INT,
  name VARCHAR(100),
  PRIMARY KEY (id),
  FOREIGN KEY (product_id) REFERENCES Product(id)
);
CREATE TABLE Reviews (
  id INT NOT NULL AUTO_INCREMENT,
  product_id INT,
  rating INT,
  date DATETIME,
  summary VARCHAR(256),
  body VARCHAR(1000),
  recommend BOOLEAN,
  reported BOOLEAN,
  reviewer_name VARCHAR(100),
  reviewer_email VARCHAR(100),
  response VARCHAR(1000) NULL,
  helpfulness INT,
  PRIMARY KEY (id),
  FOREIGN KEY (product_id) REFERENCES Product(id)
);

CREATE TABLE Characteristic_Reviews (
  id INT NOT NULL AUTO_INCREMENT,
  characteristic_id INT,
  review_id INT,
  value VARCHAR(100),
  PRIMARY KEY (id),
  FOREIGN KEY (review_id) REFERENCES Reviews(id),
  FOREIGN KEY (characteristic_id) REFERENCES Characteristics(id)
);



CREATE TABLE Review_Photos (
  id INT NOT NULL AUTO_INCREMENT,
  review_id INT,
  url VARCHAR(256),
  PRIMARY KEY (id),
  FOREIGN KEY (review_id) REFERENCES Reviews(id)
);


CREATE TABLE Cart (
  id INT NOT NULL AUTO_INCREMENT,
  user_session VARCHAR(20),
  product_id INT,
  active BOOLEAN,
  PRIMARY KEY (id)
  FOREIGN KEY (product_id) REFERENCES Product(id)
);
