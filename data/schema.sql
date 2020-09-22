DROP TABLE aww;
CREATE TABLE IF NOT EXISTS aww(
    id SERIAL PRIMARY KEY,
    country VARCHAR(255),
    totaldeaths VARCHAR(255),
    totalrecovered VARCHAR(255),
    totalconfirmed VARCHAR(255), 
    Date VARCHAR(255)
)