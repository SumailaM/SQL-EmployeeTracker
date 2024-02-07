-- Insert sample departments
INSERT INTO departments (name) VALUES
('Produce'),
('Dairy'),
('Meat'),
('Bakery'),
('Frozen Foods');

-- Insert sample roles
INSERT INTO roles (title, salary, department_id) VALUES
('Stock Clerk', 25000, 1),
('Dairy Associate', 28000, 2),
('Butcher', 35000, 3),
('Baker', 30000, 4),
('Freezer Attendant', 26000, 5);

-- Insert sample employees
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
('Alice', 'Smith', 1, NULL),
('Bob', 'Johnson', 2, 1),
('Charlie', 'Brown', 3, 1),
('David', 'Lee', 4, 2),
('Emma', 'Davis', 5, 3);
