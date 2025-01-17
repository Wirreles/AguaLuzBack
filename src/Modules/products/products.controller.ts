import { AuthGuard } from 'src/guards/AuthGuard';
import { ProductsService } from './products.service';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  HttpCode,
  Body,
  Query,
  UseGuards,
  ParseUUIDPipe,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { RolesGuard } from 'src/guards/roles.guards';
import { Role } from '../../roles/roles.enum';
import { Roles } from 'src/roles/roles.decorator';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ProductsDto } from 'src/dto/products.dto';
import { FileInterceptor } from '@nestjs/platform-express';


@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
  ) {}

  @HttpCode(200)
  @Get()
  @ApiQuery({ name: 'page', description: 'Página a mostrar', required: false })
  @ApiQuery({ name: 'limit', description: 'Límite de resultados por página', required: false})
  getProduct(
    @Query('limit') limit: string,
    @Query('page') page: string,
  ) {
    if (page && limit) {
    return this.productsService.getProducts(Number(page), Number(limit));
  }
    return this.productsService.getProducts(1, 5);
  }
  
  @HttpCode(200)
  @Get(':id')
  getProductById(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.getProductById(id);
  }

  @ApiBearerAuth()
  @HttpCode(201)
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  createProduct(@Body() product: ProductsDto) {
    return this.productsService.createProduct(product);
  }

  @ApiBearerAuth()
  @HttpCode(201)
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Put(':id')
  updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() product: ProductsDto,
  ) {
    return this.productsService.updateProduct(id, product);
  }

  @ApiBearerAuth()
  @HttpCode(200)
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  deleteProduct(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.deleteProduct(id);
  }

  @HttpCode(200)
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Post('uploadimage/:id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @ApiBody({
    required: true,
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  updateImg(
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 200000,
            message: 'El tamaño de la imagen es mayor a 200kb',
          }),
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|svg|ico|webp)$/ }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.productsService.updateImage(id, file);
  }

}
