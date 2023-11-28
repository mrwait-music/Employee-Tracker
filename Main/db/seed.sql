use employees;

INSERT INTO department
    (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal')

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Sales Manager', 100000, 1)
    ('Sales TM', 80000, 1)
    ('Engineering Manager', 100000, 2)
    ('Engineer', 80000, 2)
    ('Account Manager', 100000, 3)
    ('Accountant', 80000, 3)
    ('Head Lawyer', 100000, 4)
    ('Lawyer', 80000, 4)

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Mike', 'Wazowski', 1, NULL)
    ('George', 'Sanderson', 2, 1)
    ('James', 'Sullivan', 3, NULL)
    ('Jeffrey', 'Fungus', 4, 3)
    ('Claws', 'Ward', 5, NULL)
    ('Charlie', 'Proctor', 6, 5)
    ('Randall', 'Boggs', 7, NULL)
    ('Henry', 'Waternoose', 8, 7)