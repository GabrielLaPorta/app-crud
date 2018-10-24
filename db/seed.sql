CREATE TABLE Clients (
    id INT NOT NULL IDENTITY(1, 1),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    age INT NOT NULL
);

CREATE TABLE Addresses ( 
    id INT NOT NULL IDENTITY(1, 1),
    client_id INT NOT NULL,
    address VARCHAR(120) NOT NULL,
    city VARCHAR(100) NOT NULL,
    zip_code VARCHAR(5) NOT NULL
);

CREATE TABLE Classes (
    id INT NOT NULL IDENTITY(1, 1),
    name VARCHAR(100) NOT NULL,
    description VARCHAR(255)
);

CREATE TABLE Clients_Classes (
    id INT NOT NULL IDENTITY(1, 1),
    client_id INT NOT NULL,
    class_id INT NOT NULL
);

ALTER TABLE Clients
    ADD CONSTRAINT PK_CLIENTS PRIMARY KEY CLUSTERED (id);

ALTER TABLE Addresses 
    ADD CONSTRAINT PK_ADDRESSES PRIMARY KEY CLUSTERED (id);

ALTER TABLE Classes
    ADD CONSTRAINT PK_CLASSES PRIMARY KEY CLUSTERED (id);

ALTER TABLE Clients_Classes
    ADD CONSTRAINT PK_CLIENTS_CLASSES PRIMARY KEY CLUSTERED (id);

ALTER TABLE Addresses WITH NOCHECK
    ADD CONSTRAINT FK_ADDRESSES_CLIENTS FOREIGN KEY (client_id) REFERENCES Clients (id);

ALTER TABLE Clients_Classes
    ADD CONSTRAINT FK_CLIENTS FOREIGN KEY (client_id) REFERENCES Clients (id);

ALTER TABLE Clients_Classes
    ADD CONSTRAINT FK_CLASSES FOREIGN KEY (class_id) REFERENCES Classes (id);

INSERT INTO Clients VALUES ('Gabriel', 'gabrielteste@gmail.com', 18);
INSERT INTO Clients VALUES ('João', 'joaoteste@gmail.com', 25);

INSERT INTO Addresses VALUES (1, 'Avenida Carlos Gomes, 1610', 'Porto Alegre', '12345');
INSERT INTO Addresses VALUES (1, 'Avenida Ipiranga, 1234', 'Canoas', '54321');
INSERT INTO Addresses VALUES (2, 'Rua aristides rosa, 599', 'Caxias do Sul', '52143');