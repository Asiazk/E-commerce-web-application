package com.asia.ecommerce.controller;

import com.asia.ecommerce.entity.StoreItemEntity;
import com.asia.ecommerce.services.ProductService;
import org.apache.commons.io.FileUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.List;
import java.util.Map;

import static com.asia.ecommerce.constants.Constants.UPLOAD_PATH;
import static org.springframework.http.MediaType.IMAGE_JPEG_VALUE;
import static org.springframework.http.MediaType.IMAGE_PNG_VALUE;


@CrossOrigin(origins = "http://localhost:3000")// allow communication between UI application and spring
@RestController
@RequestMapping("/api/v1")
public class ProductController {

    private ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/storeItems")
    public List<StoreItemEntity> getAllProducts(){
        return productService.getAllProducts();
    }

    @PostMapping("/storeItems")
    public ResponseEntity<?> addProduct(@RequestBody StoreItemEntity storeItemEntity) {
        return productService.addProduct(storeItemEntity);
    }

    @PutMapping("/uploadImage")
    public ResponseEntity<String> handleFileUpload(
            @RequestParam("id") long id,
            @RequestParam("file")MultipartFile file) {
        return ResponseEntity.ok().body(productService.uploadPhoto(id, file));
    }

    @GetMapping(path = "/images/{filename}", produces = {IMAGE_PNG_VALUE, IMAGE_JPEG_VALUE})
    public byte[] getPhoto(@PathVariable("filename") String filename) throws IOException {
        return Files.readAllBytes(Paths.get(UPLOAD_PATH + filename));
    }

    @GetMapping("/storeItems/{id}")
    public ResponseEntity<StoreItemEntity> getItemById(@PathVariable long id){
        return ResponseEntity.ok(productService.getItemById(id));
    }

    @PutMapping("/storeItems/{id}")
    public ResponseEntity<StoreItemEntity> updateItem(
            @PathVariable long id,
            @RequestBody StoreItemEntity item) {
        StoreItemEntity updatedItem = productService.updateItem(id, item);
        return ResponseEntity.ok(updatedItem);
    }

    @DeleteMapping("/storeItems/{id}")
    public ResponseEntity<Boolean> deleteProduct(@PathVariable long id) {
        boolean deleted = false;
        deleted = productService.deleteItem(id);
        return ResponseEntity.ok(deleted);
    }

    @GetMapping("/storeItems/size")
    public ResponseEntity<Long> getNumOfItems() {
        return ResponseEntity.ok(productService.getNumOfItems());
    }


}
