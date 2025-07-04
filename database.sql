CREATE database IWT_PROJECT;
USE IWT_PROJECT;
SHOW TABLES;


CREATE TABLE register (
    ACCOUNT_ID   VARCHAR(8) PRIMARY KEY,
    FIRST_NAME   VARCHAR(50) NOT NULL,
    MIDDLE_NAME  VARCHAR(50),
    LAST_NAME    VARCHAR(50) NOT NULL,
    EMAIL_ID     VARCHAR(50) NOT NULL,
    MOBILE_NO    BIGINT,
    PHONE_NO     BIGINT,
    PASSWORD     TEXT,
    CREATED_AT   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);



CREATE TABLE application_form (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    mobile_number VARCHAR(10) NOT NULL,
    gender ENUM('Male', 'Female', 'other') NOT NULL,
    dob DATE NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(50),
    pincode VARCHAR(6),
    state VARCHAR(50),
    country VARCHAR(50),
    hobbies TEXT,
    qualifications TEXT,
    course_applied ENUM('BCA', 'BCom', 'BSc', 'BA', 'MCA', 'MCom', 'MSc', 'MA') NOT NULL,
    submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DESC application_form;
select * from application_form;
SHOW TABLES;


CREATE TABLE application (
    id INT AUTO_INCREMENT PRIMARY KEY,

    -- Previous Connection
    Select_status VARCHAR(50),
    previousconnection VARCHAR(255),

    -- Connection Services
    connType VARCHAR(50),
    meterType VARCHAR(50),
    TotalAreaOfPremises1 VARCHAR(50),
    TotalFloors1 VARCHAR(10),

    -- General Particulars
    Title VARCHAR(10),
    AccountID VARCHAR(20),
    dob1 DATE,
    applicantname VARCHAR(100),

    -- Supply Address
    address VARCHAR(255),
    Pincode CHAR(6),
    phonenumber CHAR(10),
    email VARCHAR(100),

    -- Billing Address
    billaddress VARCHAR(255),

    -- Electricity Usage Category
    ChooseCategory VARCHAR(50),

    -- Identity Details
    pancard VARCHAR(10),
    aadharcard CHAR(12),
    gstnumber VARCHAR(20),

    -- File Upload (store only filename or path; not the file itself in DB)
    document TEXT,

    -- Timestamp
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE complaints (
    ComplaintID    INT AUTO_INCREMENT PRIMARY KEY,
    UserID         VARCHAR(50) NOT NULL,
    ComplaintType  VARCHAR(100),
    Description    TEXT,
    Status         VARCHAR(50) DEFAULT 'Pending',
    Date           TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Remark         TEXT
);


ALTER TABLE application
ADD CONSTRAINT fk_account
FOREIGN KEY (AccountID)
REFERENCES register(ACCOUNT_ID);

ALTER TABLE complaints
ADD CONSTRAINT fk_customer
FOREIGN KEY (UserID)
REFERENCES register(ACCOUNT_ID);


ALTER TABLE application ADD COLUMN Status VARCHAR(20);


