import java.util.*;
import java.util.stream.Collectors;

class Employee {
    int id;
    String name;
    String department;
    double salary;

    Employee(int id, String name, String department, double salary) {
        this.id = id;
        this.name = name;
        this.department = department;
        this.salary = salary;
    }

    public String getDepartment() {
        return department;
    }

    public double getSalary() {
        return salary;
    }
}

public class Main {
    public static void main(String[] args) {
        List<Employee> employees = Arrays.asList(
            new Employee(101, "Alice", "HR", 55000.50),
            new Employee(102, "Bob", "Finance", 65000.75),
            new Employee(103, "Charlie", "IT", 75000.00),
            new Employee(104, "Diana", "HR", 72000.00),
            new Employee(105, "Evan", "Finance", 88000.90),
            new Employee(106, "Fiona", "IT", 99000.00),
            new Employee(107, "George", "Sales", 61000.25),
            new Employee(108, "Hannah", "Sales", 74500.00),
            new Employee(109, "Ivan", "Engineering", 120000.00),
            new Employee(110, "Julia", "Engineering", 115500.50),
            new Employee(111, "Kiran", "IT", 101000.00),
            new Employee(112, "Lena", "Finance", 90500.00)
        );

        Map<String, Optional<Employee>> result = employees.stream()
            .collect(Collectors.groupingBy(
                Employee::getDepartment,
                Collectors.maxBy(Comparator.comparingDouble(Employee::getSalary))
            ));

        result.forEach((dept, emp) ->
            System.out.println(dept + " -> " + emp.get().name + " : " + emp.get().salary)
        );
    }
}
