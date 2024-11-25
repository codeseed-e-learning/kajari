<?php
// Allow CORS for all origins and handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    exit(0); // Exit early for preflight requests
}

class Database
{
    private $connection;

    public function __construct($host, $user, $password, $dbname)
    {
        // Allow CORS headers for actual requests
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Authorization");

        $this->connection = new mysqli($host, $user, $password, $dbname);

        if ($this->connection->connect_error) {
            die("Connection failed: " . $this->connection->connect_error);
        }
    }

    // Create
    public function create($table, $data)
    {
        $columns = implode(", ", array_keys($data));
        $values = implode(", ", array_map(function ($value) {
            return "'" . mysqli_real_escape_string($this->connection, $value) . "'";
        }, array_values($data)));
        $sql = "INSERT INTO $table ($columns) VALUES ($values)";
        if (!$this->connection->query($sql)) {
            die("Error inserting data: " . $this->connection->error);
        }
        return true;
    }

    // Read
    public function read($table, $conditions = "")
    {
        $sql = "SELECT * FROM $table" . ($conditions ? " WHERE $conditions" : "");
        $result = $this->connection->query($sql);
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    // Update
    public function update($table, $data, $conditions)
    {
        $set = "";
        foreach ($data as $column => $value) {
            $set .= "$column = '" . $this->connection->real_escape_string($value) . "', ";
        }
        $set = rtrim($set, ", ");
        $sql = "UPDATE $table SET $set WHERE $conditions";
        return $this->connection->query($sql);
    }

    // Delete
    public function delete($table, $conditions)
    {
        $sql = "DELETE FROM $table WHERE $conditions";
        return $sql;
        return $this->connection->query($sql);
    }

    public function __destruct()
    {
        $this->connection->close();
    }
}
