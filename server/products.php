<?php

include 'index.php';

$function_name = isset($_GET['function_name']) ? $_GET['function_name'] : null;
$pid = isset($_GET['id']) ? $_GET['id'] : null;
// exit();
// Create a new instance of the Database class
$db = new Database('localhost', 'root', '', 'kajari');

function create($productData)
{
    global $db; // Access the global database instance
    $db->create('products', $productData);
    echo json_encode(['status' => 'success', 'message' => 'Product added successfully.']);
}

function read()
{
    global $db; // Access the global database instance
    $products = $db->read('products'); // Assuming 'read' method fetches all products
    echo json_encode(['status' => 'success', 'data' => $products]);
}

function update($productData)
{
    global $db; // Access the global database instance
    $db->update('products', $productData); // Assuming 'update' method updates the product
    echo json_encode(['status' => 'success', 'message' => 'Product updated successfully.']);
}

function delete($pid=6)
{
    global $db; // Access the global database instance
    $db->delete('products', "product_id = $pid"); // Pass the condition for deletion
    echo json_encode(['status' => 'success', 'message' => 'Product deleted successfully.']);
}

// echo $function_name."()";
if (function_exists($function_name)) {
    call_user_func($function_name);
} else {
    echo "Function does not exist.";
}

// exit();

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the product data from the request body
    $productData = json_decode(file_get_contents('php://input'), true);

    // Validate the incoming data
    if (isset($productData['action'])) {
        switch ($productData['action']) {
            case 'create':
                create($productData);
                break;
            case 'update':
                update($productData);
                break;
            // ... existing code ...
            case 'delete':
                if (isset($productData['id'])) { // Check if 'id' is set
                    delete($productData['id']); // Pass the 'id' for deletion
                } else {
                    echo json_encode(['status' => 'error', 'message' => 'Product ID is required for deletion.']);
                }
                break;
            default:
                echo json_encode(['status' => 'error', 'message' => 'Invalid action.']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid product data.']);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    read(); // Handle read operation for GET requests
} else {
    // Respond with a method not allowed message
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed.']);
}

// ... existing code ...

