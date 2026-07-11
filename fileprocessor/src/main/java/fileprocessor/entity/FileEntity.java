package fileprocessor.entity;
import java.time.LocalDateTime;
import jakarta.persistence.*;

@Entity
@Table(name = "files")
public class FileEntity {

    @Id
    @GeneratedValue(strategy = 
    GenerationType.IDENTITY)
    private Long id;

    private String filename;
    private String filetype;
    private Long filesize;
    private LocalDateTime uploadTime;

    public Long getId() {
        return id;
    }

    public String getFilename() {
        return filename;
    }
    public void setFilename(String filename) {
    this.filename = filename;
}

public void setFiletype(String filetype) {
    this.filetype = filetype;
}

public void setFilesize(Long filesize) {
    this.filesize = filesize;
}

public void setUploadTime(LocalDateTime uploadTime) {
    this.uploadTime = uploadTime;
}
public String getFiletype() {
    return filetype;
}

public Long getFilesize() {
    return filesize;
}

public LocalDateTime getUploadTime() {
    return uploadTime;
}
}