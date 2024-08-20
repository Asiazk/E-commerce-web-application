package com.asia.ecommerce.services;

import com.asia.ecommerce.constants.Constants;
import com.asia.ecommerce.entity.StoreItemEntity;
import com.asia.ecommerce.repository.StoreItemRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;

@Service
public class ProductService {
    private StoreItemRepository storeItemRepository;

    public ProductService(StoreItemRepository storeItemRepository) {
        this.storeItemRepository = storeItemRepository;
    }

    public List<StoreItemEntity> getAllProducts(){
        return storeItemRepository.findAll();
    }

    public ResponseEntity<?> addProduct(StoreItemEntity request) {
        StoreItemEntity product = new StoreItemEntity();
        BeanUtils.copyProperties(request, product);
        System.out.println(product);
        storeItemRepository.save(product);
        return ResponseEntity.ok(product);
    }

    @Transactional
    public StoreItemEntity getItemById(long id) {
        return storeItemRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
    }

    @Transactional
    public String uploadPhoto(long id, MultipartFile file) {
        StoreItemEntity item = getItemById(id);
        String photoUrl =  photoFunction(id, file);
        item.setImageUrl(photoUrl);
        storeItemRepository.save(item);
        return photoUrl;
    }

    private String photoFunction (long id, MultipartFile image) {
        try {
            Path fileStorageLocation = Paths.get(Constants.UPLOAD_PATH).toAbsolutePath().normalize();
            System.out.println("STORAGELOCATION:" + fileStorageLocation);
            if(!Files.exists(fileStorageLocation)) {
                Files.createDirectories(fileStorageLocation);
            }
            SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd-HHmmss");
            Date now = new Date();
            String formattedDateTime = sdf.format(now);
            String fileName = formattedDateTime + '-' + image.getOriginalFilename();
            Files.copy(image.getInputStream(), fileStorageLocation.resolve(fileName), REPLACE_EXISTING);
            return ServletUriComponentsBuilder
                    .fromCurrentContextPath()
                    .path("api/v1/images/" + fileName)
                    .toUriString();
        } catch (Exception exception) {
            throw new RuntimeException("Uploading image failed");
        }
    }

    @Transactional
    public StoreItemEntity updateItem(long id, StoreItemEntity updatedItem) {
        StoreItemEntity dbItem = storeItemRepository.findById(id).get();
        BeanUtils.copyProperties(updatedItem, dbItem);
        storeItemRepository.save(dbItem);
        return dbItem;
    }

    @Transactional
    public boolean deleteItem(long id) {
        StoreItemEntity item = storeItemRepository
                .findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        storeItemRepository.delete(item);
        return true;
    }

    public long getNumOfItems() {
        return storeItemRepository.count();
    }
}
