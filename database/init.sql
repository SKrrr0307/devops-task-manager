CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Pending'
);

INSERT INTO tasks (title, status)
VALUES
('Learn Docker', 'Completed'),
('Build CI/CD Pipeline', 'In Progress'),
('Learn Kubernetes', 'Pending');
